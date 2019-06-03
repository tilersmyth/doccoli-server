import { EntityManager } from "typeorm";
import { ChildrenNodeEntity } from "../../../../../entity";

export class ChildrenNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  get nodeEntity() {
    return ChildrenNodeEntity;
  }

  save(connector: any, fields: any) {
    const children = new ChildrenNodeEntity();
    Object.assign(children, fields);
    children.startCommit = this.commit;
    children.connector = connector;
    return this.transaction.save(children);
  }
}
