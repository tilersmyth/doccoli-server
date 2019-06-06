import { EntityManager } from "typeorm";

import { QueryNode } from "./Query";

export class UpdateNode extends QueryNode {
  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
  }

  private argsQueryFormat = (entity: string, acc: any, arg: any) => {
    acc += acc && " AND ";
    acc += `${entity}.${arg.key} = '${arg.value}'`;
    return acc;
  };

  private update = async (entityId: string, query: any) => {
    try {
      const update = query.update;

      if (!update) {
        return;
      }

      switch (update.type) {
        case "deleted":
          await this.delete(entityId);
          return;

        case "modified":
          //   await this.modify(entityId, update.node);
          return;

        case "added":
          await this.insert(entityId, update.node);
          return;

        default:
          throw Error(`Update type '${update.type} not recognized'`);
      }
    } catch (error) {
      throw error;
    }
  };

  find = async (accumulator: any, query: any) => {
    const acc = await accumulator;

    if (acc.error) {
      return acc;
    }

    const parent = acc.entities.find((p: any) => query.parent === p.id);

    const argString = query.args.reduce(
      this.argsQueryFormat.bind(this, `${query.id}Node`),
      ""
    );

    const entity = await this.select(query, parent, argString).catch(
      (error: any) => {
        acc.error = error;
        return acc;
      }
    );

    await this.update(entity.id, query).catch((error: any) => {
      acc.error = error;
      return acc;
    });

    acc.entities = [
      { id: query.id, entity: query.entity, entityId: entity.id },
      ...acc.entities
    ];

    return acc;
  };
}
