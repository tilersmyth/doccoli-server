import { EntityManager } from "typeorm";
import { CommentNodeEntity } from "../../../../../entity";

export class CommentNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  save(connector: any, fields: any) {
    const comment = new CommentNodeEntity();
    Object.assign(comment, fields);
    comment.startCommit = this.commit;
    comment.connector = connector;
    return this.transaction.save(comment);
  }
}
