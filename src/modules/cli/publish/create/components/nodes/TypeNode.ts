import { EntityManager } from "typeorm";

import { TypeNodeConnectorEntity } from "../../../../../../entity/nodes/TypeConnector";
import { TypeNodeEntity } from "../../../../../../entity/nodes/Type";

export class ModuleTypeNode {
  commit: any;
  type: any;
  transaction: EntityManager;

  constructor(commit: any, type: any, transaction: EntityManager) {
    this.commit = commit;
    this.type = type;
    this.transaction = transaction;
  }

  async save() {
    try {
      return await this.saveLoop(this.type, null);
    } catch (err) {
      throw err;
    }
  }

  private async saveLoop(type: any, parent: TypeNodeConnectorEntity | null) {
    if (!type) {
      return null;
    }

    try {
      const newType = await this.saveType(type, parent);

      if (type.types) {
        for (const types of type.types) {
          await this.saveLoop(types, newType);
        }
      }

      return newType;
    } catch (err) {
      throw err;
    }
  }

  private async saveType(
    value: any,
    parent: TypeNodeConnectorEntity | null
  ): Promise<TypeNodeConnectorEntity> {
    try {
      const type = new TypeNodeEntity();
      type.startCommit = this.commit;
      type.name = value.name;
      type.type = value.type;
      type.refPath = value.refPath;

      const savedType = await this.transaction.save(type);

      const typeConnector = new TypeNodeConnectorEntity();
      typeConnector.node = [savedType];
      typeConnector.parentType = parent;

      return await this.transaction.save(typeConnector);
    } catch (err) {
      throw err;
    }
  }
}
