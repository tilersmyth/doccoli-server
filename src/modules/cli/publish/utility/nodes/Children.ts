import { EntityManager } from "typeorm";
import {
  ChildrenNodeEntity,
  ChildrenPositionEntity
} from "../../../../../entity";

export class ChildrenNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private position = async (connector: any, position: number) => {
    const nodePosition = new ChildrenPositionEntity();
    nodePosition.connectorId = connector.id;
    nodePosition.position = position;
    nodePosition.startCommit = this.commit;
    return this.transaction.save(nodePosition);
  };

  get nodeEntity() {
    return ChildrenNodeEntity;
  }

  save = async (connector: any, fields: any) => {
    const children = new ChildrenNodeEntity();
    Object.assign(children, fields);
    children.startCommit = this.commit;
    children.connector = connector;

    if (typeof fields.position !== "undefined") {
      const position = await this.position(connector, fields.position);
      children.position = [position];
    }

    return this.transaction.save(children);
  };
}
