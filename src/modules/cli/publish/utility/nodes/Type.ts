import { EntityManager } from "typeorm";
import { TypeNodeEntity } from "../../../../../entity";

export class TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  async save(connector: any, fields: any) {
    const type = new TypeNodeEntity();
    Object.assign(type, fields);
    type.startCommit = this.commit;

    // For TypeNode we have to append the node to the
    // connector.node due to the one sided many-to-many
    // relationship
    const node = await this.transaction.save(type);
    connector.node = [node];
    await this.transaction.save(connector);

    return node;
  }
}
