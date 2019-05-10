import { EntityManager } from "typeorm";
import { TypeNodeEntity, FileEntity } from "../../../../../entity";

export class TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  async save(connector: any, fields: any) {
    try {
      const type = new TypeNodeEntity();
      Object.assign(type, fields);

      // Add file relation if type references interface
      if (fields.file) {
        const file = await this.transaction.findOne(FileEntity, {
          where: {
            project: this.commit.projectId,
            path: fields.file,
            endCommit: null
          }
        });

        if (!file) {
          throw Error(`Type file reference (${fields.file}) not found`);
        }

        type.file = file;
      }

      type.startCommit = this.commit;
      type.connector = connector;

      return this.transaction.save(type);
    } catch (err) {
      throw err;
    }
  }
}
