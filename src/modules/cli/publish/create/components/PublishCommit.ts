import { EntityManager } from "typeorm";
import { Commit } from "../../../../../entity/Commit";

export class PublishCommit {
  project: any;
  commit: { sha: string; branch: string };
  progress: { size: number; index: number };
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
        throw "commit already published";
      }

      return commit;
    } catch (err) {
      throw err;
    }
  }

  async save(commit: any) {
    try {
      const { sha, branch } = this.commit;
      const { size, index } = this.progress;

      if (!commit) {
        const newCommit = new Commit();
        newCommit.project = this.project;
        newCommit.sha = sha;
        newCommit.branch = branch;
        newCommit.index = index;
        newCommit.size = size;
        await this.transaction.save(newCommit);
        return;
      }

      if (commit.size !== size) {
        throw "file publishing quanitity inconsistency";
      }

      if (size === index) {
        commit.complete = true;
      }

      commit.index = index;

      await this.transaction.save(commit);
      return;
    } catch (err) {
      throw err;
    }
  }
}
