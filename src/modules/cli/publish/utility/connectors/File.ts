import { EntityManager } from "typeorm";

import { ModuleFileNode } from "../nodes/File";

// Dummy class used to conform to the needs of the bulk publish
// as File entity does not have a connector table
export class FileConnector extends ModuleFileNode {
  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
  }
}
