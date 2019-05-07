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
            project: this.commit.project,
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

      // For TypeNode we have to append the node to the
      // connector.node due to the one sided many-to-many
      // relationship
      const node = await this.transaction.save(type);
      connector.node = [node];
      await this.transaction.save(connector);

      return node;
    } catch (err) {
      throw err;
    }
  }
}
