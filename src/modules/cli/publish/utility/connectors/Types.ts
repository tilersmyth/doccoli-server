import { EntityManager } from "typeorm";

import { TypesNodeConnector } from "../../../../../entity";
import { TypeNode } from "../nodes/Type";

interface ConnectorRelation {
  [index: string]: any;
}

export class TypesConnector extends TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  private static relations: any = [
    {
      key: "type",
      instance: "TypeNodeConnector",
      array: false
    },
    {
      key: "typeArguments",
      instance: "TypeArgumentsNodeConnector",
      array: false
    }
  ];

  async create(parent: any) {
    const connector: ConnectorRelation = new TypesNodeConnector();

    const { name } = parent.constructor;

    const relations = TypesConnector.relations.find(
      (relation: any) => relation.instance === name
    );

    if (!relations) {
      throw Error(`relation ${name} not joined on TypesConnector`);
    }

    if (relations) {
      connector[relations.key] = relations.array ? [parent] : parent;
    }

    return this.transaction.save(connector);
  }
}
