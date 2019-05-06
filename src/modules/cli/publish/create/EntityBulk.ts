import { EntityManager } from "typeorm";

import { router } from "./entityRouter";

export class EntityBulk {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private map = async (parent: any, entity: string, node: any) => {
    await this.insert(parent, entity, node);
  };

  async insert(parent: any, name: string, node: any) {
    try {
      if (!router[name]) {
        throw Error(`"${name}" entity not found`);
      }

      const entity = new router[name](this.commit, this.transaction);

      const connector = await entity.create(parent);

      await entity.save(connector, node);

      for (const prop of Object.keys(node)) {
        if (Array.isArray(node[prop])) {
          await Promise.all(
            node[prop].map(this.map.bind(null, connector, prop))
          );
          continue;
        }

        if (typeof node[prop] === "object") {
          await this.insert(connector, prop, node[prop]);
        }
      }

      return;
    } catch (err) {
      throw err;
    }
  }
}
