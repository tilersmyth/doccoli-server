import { EntityManager } from "typeorm";

import { ChildrenNodeEntity } from "../../../../../../entity/nodes/Children";
import {
  ModuleCommentNode,
  ModuleTypeNode,
  ModuleSignatureNode,
  ModuleParameterNode
} from "./";

export class ModuleChildrenNode {
  commit: any;
  children: any;
  parent: any;
  transaction: EntityManager;

  constructor(
    commit: any,
    children: any,
    parent: any,
    transaction: EntityManager
  ) {
    this.commit = commit;
    this.children = children;
    this.parent = parent;
    this.transaction = transaction;
  }

  async save(file: any) {
    try {
      // Save child module
      const children = new ChildrenNodeEntity();
      const signature = new ModuleSignatureNode(this.commit, this.transaction);

      children.name = this.children.name;
      children.tagged = this.children.tagged;

      children.comment = await new ModuleCommentNode(
        this.commit,
        this.children.comment,
        this.transaction
      ).save();
      children.parent = this.parent;
      children.type = await new ModuleTypeNode(
        this.commit,
        this.children.type,
        this.transaction
      ).save();
      children.indexSignature = await signature.save(
        this.children.indexSignature
      );
      children.getSignature = await signature.save(this.children.getSignature);
      children.file = file;
      children.startCommit = this.commit.id;

      const savedModule = await this.transaction.save(children);

      // Save child module parameters
      if (this.children.typeParameter) {
        for (const param of this.children.typeParameter) {
          const parameter = await new ModuleParameterNode(
            this.commit,
            param,
            this.transaction
          ).create();
          parameter.node = savedModule;
          await this.transaction.save(parameter);
        }
      }

      // Save child module signatures
      await signature.save(this.children.signatures, savedModule);

      // Save child module children descendents
      if (this.children.children) {
        for (const child of this.children.children) {
          await new ModuleChildrenNode(
            this.commit,
            child,
            savedModule,
            this.transaction
          ).save(null);
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
