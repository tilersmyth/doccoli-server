import { EntityManager } from "typeorm";

import { ModuleComment } from "../../../../../../entity/modules/ModuleComment";

export class ModuleCommentNode {
  comment: any;
  transaction: EntityManager;

  constructor(comment: any, transaction: EntityManager) {
    this.comment = comment;
    this.transaction = transaction;
  }

  async save() {
    if (!this.comment) {
      return null;
    }

    try {
      const comment = new ModuleComment();
      comment.shortText = this.comment && this.comment.shortText;
      comment.text = this.comment && this.comment.text;
      return await this.transaction.save(comment);
    } catch (err) {
      throw err;
    }
  }
}
