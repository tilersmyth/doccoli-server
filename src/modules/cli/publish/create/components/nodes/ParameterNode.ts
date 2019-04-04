import { EntityManager } from "typeorm";

import { ParameterNodeConnectorEntity } from "../../../../../../entity/nodes/ParameterConnector";
import { ParameterNodeEntity } from "../../../../../../entity/nodes/Parameter";
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
      const parameter = new ParameterNodeEntity();
      parameter.name = this.parameter.name;
      parameter.startCommit = this.commit;

      const savedParameter = await this.transaction.save(parameter);

      const parameterConnector = new ParameterNodeConnectorEntity();
      parameterConnector.node = [savedParameter];

      parameterConnector.type = await new ModuleTypeNode(
        this.commit,
        parameterConnector.type,
        this.transaction
      ).save();
      return parameterConnector;
    } catch (err) {
      throw err;
    }
  }
}
