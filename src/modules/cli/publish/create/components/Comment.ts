import { EntityManager } from "typeorm";
import { ModuleComment } from "../../../../../entity/ModuleComment";

export class Comment {
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
      comment.shortText = comment && comment.shortText;
      comment.text = comment && comment.text;
      return await this.transaction.save(comment);
    } catch (err) {
      throw err;
    }
  }
}
