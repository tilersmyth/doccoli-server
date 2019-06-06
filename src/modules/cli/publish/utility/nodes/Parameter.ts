import { EntityManager } from "typeorm";
import {
  ParameterNodeEntity,
  ParameterPositionEntity
} from "../../../../../entity";

export class ParameterNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private position = async (connector: any, position: number) => {
    const nodePosition = new ParameterPositionEntity();
    nodePosition.connectorId = connector.id;
    nodePosition.position = position;
    nodePosition.startCommit = this.commit;
    return this.transaction.save(nodePosition);
  };

  get nodeEntity() {
    return ParameterNodeEntity;
  }

  save = async (connector: any, fields: any) => {
    const parameter = new ParameterNodeEntity();
    Object.assign(parameter, fields);
    parameter.startCommit = this.commit;
    parameter.connector = connector;

    if (typeof fields.position !== "undefined") {
      const position = await this.position(connector, fields.position);
      parameter.position = [position];
    }

    return this.transaction.save(parameter);
  };
}
