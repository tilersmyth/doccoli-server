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

  private static typeField = (field: string) => {
    return `parent${field.charAt(0).toUpperCase()}${field.slice(1)}`;
  };

  private static relations: any = [
    {
      key: "children",
      instance: "ChildrenNodeConnector",
      array: false
    },
    {
      key: "signatures",
      instance: "SignatureNodeConnector",
      array: false
    },
    {
      key: "parameters",
      instance: "ParameterNodeConnector",
      array: false
    },
    {
      key: "type",
      instance: "TypeNodeConnector",
      array: false
    }
  ];

  get entity() {
    return TypeNodeConnector;
  }

  async create(entity: any, field: any) {
    try {
      const connector: ConnectorRelation = new TypeNodeConnector();

      const { name } = entity.constructor;

      const relations = TypeConnector.relations.find(
        (relation: any) => relation.instance === name
      );

      if (!relations) {
        throw Error(`relation ${name} not joined on TypeNodeConnector`);
      }

      if (relations.key === "type") {
        const fieldName = TypeConnector.typeField(field);
        connector[fieldName] = entity;
        return this.transaction.save(connector);
      }

      connector[relations.key] = relations.array ? [entity] : entity;
      return this.transaction.save(connector);
    } catch (err) {
      throw err;
    }
  }
}
