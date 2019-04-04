import { EntityManager } from "typeorm";

import { FileEntity } from "../../../../../../entity/File";

export class ModuleFileNode {
  project: any;
  commit: any;
  file: any;
  transaction: EntityManager;

  constructor(
    project: any,
    commit: any,
    file: any,
    transaction: EntityManager
  ) {
    this.project = project;
    this.commit = commit;
    this.file = file;
    this.transaction = transaction;
  }

  async save() {
    try {
      const file = new FileEntity();
      file.name = this.file.name;
      file.kind = this.file.kind;
      file.path = this.file.path;
      file.project = this.project;
      file.startCommit = this.commit;

      return await this.transaction.save(file);
    } catch (err) {
      throw err;
    }
  }
}
