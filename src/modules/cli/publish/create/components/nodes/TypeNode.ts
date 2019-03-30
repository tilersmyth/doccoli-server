import { EntityManager } from "typeorm";

import { ModuleType } from "../../../../../../entity/modules/ModuleType";

export class ModuleTypeNode {
  commit: any;
  type: any;
  transaction: EntityManager;

  constructor(commit: any, type: any, transaction: EntityManager) {
    this.commit = commit;
    this.type = type;
    this.transaction = transaction;
  }

  private async saveLoop(type: any, parent: ModuleType | null) {
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
    type: any,
    parent: ModuleType | null
  ): Promise<ModuleType> {
    try {
      const newType = new ModuleType();
      newType.startCommit = this.commit.id;
      newType.name = type.name;
      newType.type = type.type;
      newType.refPath = type.refPath;
      newType.parentType = parent;
      return await this.transaction.save(newType);
    } catch (err) {
      throw err;
    }
  }

  async save() {
    try {
      return await this.saveLoop(this.type, null);
    } catch (err) {
      throw err;
    }
  }
}
