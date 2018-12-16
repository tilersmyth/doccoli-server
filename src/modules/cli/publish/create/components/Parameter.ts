import { EntityManager } from "typeorm";
import { ModuleParameter } from "../../../../../entity/ModuleParameter";
import { Type } from "./Type";

export class Parameter {
  parameter: any;
  transaction: EntityManager;

  constructor(parameter: any, transaction: EntityManager) {
    this.parameter = parameter;
    this.transaction = transaction;
  }

  async create() {
    try {
      const parameter = new ModuleParameter();
      parameter.name = this.parameter.name;
      parameter.type = await new Type(parameter.type, this.transaction).save();
      return parameter;
    } catch (err) {
      throw err;
    }
  }
}
