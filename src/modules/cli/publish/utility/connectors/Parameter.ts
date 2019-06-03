import { EntityManager } from "typeorm";

import { ParameterNodeConnector } from "../../../../../entity";
import { ParameterNode } from "../nodes/Parameter";

export class ParameterConnector extends ParameterNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  get entity() {
    return ParameterNodeConnector;
  }

  async create(entity: any, _: any) {
    const newConnector = new ParameterNodeConnector();

    const { name } = entity.constructor;

    if (name === "TypeNodeConnector") {
      newConnector.type = entity;
    }

    if (name === "ChildrenNodeConnector") {
      newConnector.children = entity;
    }

    if (name === "SignatureNodeConnector") {
      newConnector.signatures = entity;
    }

    return this.transaction.save(newConnector);
  }
}
