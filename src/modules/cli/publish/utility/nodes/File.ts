import { EntityManager } from "typeorm";

import { FileEntity } from "../../../../../entity";

export class ModuleFileNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  find(project: any, path: string) {
    return this.transaction.findOne(FileEntity, {
      where: { project, path, endCommit: null }
    });
  }

  save(entity: any, fields: any) {
    Object.assign(entity, fields);
    return this.transaction.save(entity);
  }
}
