import { EntityManager } from "typeorm";

import { ModuleComment } from "../../../../../../entity/modules/ModuleComment";

export class ModuleCommentNode {
  commit: any;
  comment: any;
  transaction: EntityManager;

  constructor(commit: any, comment: any, transaction: EntityManager) {
    this.commit = commit;
    this.comment = comment;
    this.transaction = transaction;
  }

  async save() {
    if (!this.comment) {
      return null;
    }

    try {
      const comment = new ModuleComment();
      comment.startCommit = this.commit.id;
      comment.shortText = this.comment && this.comment.shortText;
      comment.text = this.comment && this.comment.text;
      return await this.transaction.save(comment);
    } catch (err) {
      throw err;
    }
  }
}
