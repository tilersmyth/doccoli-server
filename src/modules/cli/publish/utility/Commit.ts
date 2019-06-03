import { EntityManager } from "typeorm";
import { Commit } from "../../../../entity";

export class PublishCommit {
  project: any;
  commit: { sha: string; branch: string };
  progress: { total: number; published: number };
  transaction: EntityManager;

  constructor(
    project: any,
    commit: any,
    progress: any,
    transaction: EntityManager
  ) {
    this.project = project;
    this.commit = commit;
    this.progress = progress;
    this.transaction = transaction;
  }

  async find() {
    try {
      const { sha, branch } = this.commit;

      const commit = await this.transaction.findOne(Commit, {
        where: { project: this.project, sha, branch }
      });

      if (commit && commit.complete) {
        throw Error("commit already published");
      }

      return commit;
    } catch (err) {
      throw err;
    }
  }

  async save(commit?: any) {
    try {
      const { sha, branch } = this.commit;
      const { total, published } = this.progress;

      if (!commit) {
        // Get count of commits within current branch
        const countByBranch = await Commit.count({
          where: { project: this.project, branch }
        });

        const newCommit = new Commit();
        newCommit.project = this.project;
        newCommit.sha = sha;
        newCommit.branch = branch;
        newCommit.published = published;
        newCommit.total = total;
        newCommit.complete = total === published ? true : false;
        newCommit.index = countByBranch + 1;

        return this.transaction.save(newCommit);
      }

      if (commit.total !== total) {
        throw Error("file publishing quanitity inconsistency");
      }

      if (total === published) {
        commit.complete = true;
      }

      commit.published = published;

      return await this.transaction.save(commit);
    } catch (err) {
      throw err;
    }
  }
}
