import { EntityManager } from "typeorm";

import { ModuleParameter } from "../../../../../../entity/modules/ModuleParameter";
import { ModuleTypeNode } from "./TypeNode";

export class ModuleParameterNode {
  commit: any;
  parameter: any;
  transaction: EntityManager;

  constructor(commit: any, parameter: any, transaction: EntityManager) {
    this.commit = commit;
    this.parameter = parameter;
    this.transaction = transaction;
  }

  async create() {
    try {
      const parameter = new ModuleParameter();
      parameter.name = this.parameter.name;
      parameter.type = await new ModuleTypeNode(
        this.commit,
        parameter.type,
        this.transaction
      ).save();
      return parameter;
    } catch (err) {
      throw err;
    }
  }
}
