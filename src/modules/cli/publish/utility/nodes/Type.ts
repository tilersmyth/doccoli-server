import { EntityManager } from "typeorm";
import {
  TypeNodeEntity,
  FileEntity,
  TypePositionEntity
} from "../../../../../entity";

export class TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private position = async (connector: any, position: number) => {
    const nodePosition = new TypePositionEntity();
    nodePosition.connectorId = connector.id;
    nodePosition.position = position;
    nodePosition.startCommit = this.commit;
    return this.transaction.save(nodePosition);
  };

  get nodeEntity() {
    return TypeNodeEntity;
  }

  save = async (connector: any, fields: any) => {
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

      if (typeof fields.position !== "undefined") {
        const position = await this.position(connector, fields.position);
        type.position = [position];
      }

      return this.transaction.save(type);
    } catch (err) {
      throw err;
    }
  };
}
