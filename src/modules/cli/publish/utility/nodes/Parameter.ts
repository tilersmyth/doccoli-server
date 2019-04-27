import { EntityManager } from "typeorm";
import { ParameterNodeEntity } from "../../../../../entity";

export class ParameterNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  save(connector: any, fields: any) {
    const parameter = new ParameterNodeEntity();
    Object.assign(parameter, fields);
    parameter.startCommit = this.commit;
    parameter.connector = connector;
    return this.transaction.save(parameter);
  }
}
