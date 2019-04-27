import { EntityManager } from "typeorm";

import { TypeNodeConnector } from "../../../../../entity";
import { TypeNode } from "../nodes/Type";

interface ConnectorRelation {
  [index: string]: any;
}

export class TypeConnector extends TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  private static relations: any = [
    {
      key: "children",
      instance: "ChildrenNodeConnector",
      array: true
    },
    {
      key: "signatures",
      instance: "SignatureNodeConnector",
      array: true
    },
    {
      key: "parameters",
      instance: "ParameterNodeConnector",
      array: true
    }
  ];

  async create(parent: any) {
    try {
      const connector: ConnectorRelation = new TypeNodeConnector();

      const { name } = parent.constructor;

      const relations = TypeConnector.relations.find(
        (relation: any) => relation.instance === name
      );

      if (!relations) {
        throw Error(`relation ${name} not joined on TypeNodeConnector`);
      }

      if (relations) {
        connector[relations.key] = relations.array ? [parent] : parent;
      }

      return this.transaction.save(connector);
    } catch (err) {
      throw err;
    }
  }
}
