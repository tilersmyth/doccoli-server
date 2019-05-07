import { EntityManager } from "typeorm";

import { FileEntity } from "../../../../../entity";

export class ModuleFileNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  find(project: any, args: any) {
    return this.transaction.findOne(FileEntity, {
      where: { project, endCommit: null, ...args }
    });
  }
}
