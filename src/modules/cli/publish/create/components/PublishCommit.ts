import { EntityManager } from "typeorm";
import { Commit } from "../../../../../entity/Commit";

export class PublishCommit {
  project: any;
  commit: { sha: string; branch: string };
  progress: { nodesTotal: number; nodesPublished: number };
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

      const commit = await Commit.findOne({
        where: { project: this.project.id, sha, branch }
      });

      if (commit && commit.complete) {
        throw Error("commit already published");
      }

      return commit;
    } catch (err) {
      throw err;
    }
  }

  async save(commit: any) {
    try {
      const { sha, branch } = this.commit;
      const { nodesTotal, nodesPublished } = this.progress;

      if (!commit) {
        // Get count of commits within current branch
        const countByBranch = await Commit.count({
          where: { project: this.project.id, branch }
        });

        const newCommit = new Commit();
        newCommit.project = this.project;
        newCommit.sha = sha;
        newCommit.branch = branch;
        newCommit.nodesPublished = nodesPublished;
        newCommit.nodesTotal = nodesTotal;
        newCommit.complete = nodesTotal === nodesPublished ? true : false;
        newCommit.index = countByBranch + 1;

        return this.transaction.save(newCommit);
      }

      if (commit.nodesTotal !== nodesTotal) {
        throw Error("file publishing quanitity inconsistency");
      }

      if (nodesTotal === nodesPublished) {
        commit.complete = true;
      }

      commit.nodesPublished = nodesPublished;

      return await this.transaction.save(commit);
    } catch (err) {
      throw err;
    }
  }
}
