import { EntityManager } from "typeorm";

import { ModuleChildren } from "../../../../../../entity/modules/ModuleChildren";
import {
  ModuleCommentNode,
  ModuleTypeNode,
  ModuleSignatureNode,
  ModuleParameterNode
} from "./";

export class ModuleChildrenNode {
  children: any;
  parent: any;
  transaction: EntityManager;

  constructor(children: any, parent: any, transaction: EntityManager) {
    this.children = children;
    this.parent = parent;
    this.transaction = transaction;
  }

  async save(file: any) {
    try {
      // Save child module
      const children = new ModuleChildren();
      const signature = new ModuleSignatureNode(this.transaction);

      children.name = this.children.name;
      children.tagged = this.children.tagged;

      children.comment = await new ModuleCommentNode(
        this.children.comment,
        this.transaction
      ).save();
      children.parent = this.parent;
      children.type = await new ModuleTypeNode(
        this.children.type,
        this.transaction
      ).save();
      children.indexSignature = await signature.save(
        this.children.indexSignature
      );
      children.getSignature = await signature.save(this.children.getSignature);
      children.file = file;

      const savedModule = await this.transaction.save(children);

      // Save child module parameters
      if (this.children.typeParameter) {
        for (const param of this.children.typeParameter) {
          const parameter = await new ModuleParameterNode(
            param,
            this.transaction
          ).create();
          parameter.module = savedModule;
          await this.transaction.save(parameter);
        }
      }

      // Save child module signatures
      await signature.save(this.children.signatures, savedModule);

      // Save child module children descendents
      if (this.children.children) {
        for (const children of this.children.children) {
          await new ModuleChildrenNode(
            children,
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
