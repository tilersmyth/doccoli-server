import { EntityManager } from "typeorm";

import { ChildrenNodeConnectorEntity } from "../../../../../../entity/nodes/ChildrenConnector";
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
      const childrenConnector = new ChildrenNodeConnectorEntity();
      const signature = new ModuleSignatureNode(this.commit, this.transaction);

      const children = new ChildrenNodeEntity();
      children.name = this.children.name;
      children.tagged = this.children.tagged;
      children.startCommit = this.commit;
      const savedChildren = await this.transaction.save(children);

      childrenConnector.node = [savedChildren];

      childrenConnector.comment = await new ModuleCommentNode(
        this.commit,
        this.children.comment,
        this.transaction
      ).save();

      childrenConnector.parent = this.parent;
      childrenConnector.type = await new ModuleTypeNode(
        this.commit,
        this.children.type,
        this.transaction
      ).save();
      childrenConnector.indexSignature = await signature.save(
        this.children.indexSignature
      );
      childrenConnector.getSignature = await signature.save(
        this.children.getSignature
      );
      childrenConnector.file = file;

      const savedModule = await this.transaction.save(childrenConnector);

      // Save child module parameters
      if (this.children.typeParameter) {
        for (const param of this.children.typeParameter) {
          const parameter = await new ModuleParameterNode(
            this.commit,
            param,
            this.transaction
          ).create();

          parameter.children = savedModule;
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
