import { EntityManager } from "typeorm";

import { FileEntity } from "../../../../../entity";
import { ModuleFileNode } from "../nodes/File";

// Dummy class used to conform to the needs of the bulk publish
// as File entity does not have a connector table
export class FileConnector extends ModuleFileNode {
  commit: any;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.commit = commit;
  }

  create(project: any) {
    const newFile = new FileEntity();
    newFile.startCommit = this.commit;
    newFile.project = project;
    return newFile;
  }
}
