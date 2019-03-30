import { EntityManager } from "typeorm";

import { ModuleSignature } from "../../../../../../entity/modules/ModuleSignature";
import { ModuleCommentNode, ModuleTypeNode, ModuleParameterNode } from "./";

export class ModuleSignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private async create(signature: any) {
    const newSignature = new ModuleSignature();
    newSignature.name = signature.name;
    newSignature.kind = signature.kind;
    newSignature.comment = await new ModuleCommentNode(
      this.commit,
      signature.comment,
      this.transaction
    ).save();
    newSignature.type = await new ModuleTypeNode(
      this.commit,
      signature.type,
      this.transaction
    ).save();

    return newSignature;
  }

  private async parameters(node: any, signature: any) {
    if (signature.parameters) {
      for (const param of signature.parameters) {
        const parameter = await new ModuleParameterNode(
          this.commit,
          param,
          this.transaction
        ).create();

        parameter.startCommit = this.commit.id;
        parameter.signature = node;

        await this.transaction.save(parameter);
      }
    }

    if (signature.typeParameter) {
      for (const param of signature.typeParameter) {
        const parameter = await new ModuleParameterNode(
          this.commit,
          param,
          this.transaction
        ).create();
        parameter.startCommit = this.commit.id;
        parameter.typeSignature = node;
        await this.transaction.save(parameter);
      }
    }
  }

  private async insert(signature: any, module: any): Promise<ModuleSignature> {
    const newSignature = await this.create(signature);
    newSignature.startCommit = this.commit.id;
    newSignature.module = module;
    const savedSignature = await this.transaction.save(newSignature);
    await this.parameters(savedSignature, signature);
    return savedSignature;
  }

  async save(signature: any, module?: any): Promise<ModuleSignature | null> {
    try {
      if (!signature) {
        return null;
      }

      if (Array.isArray(signature)) {
        for (const sig of signature) {
          await this.insert(sig, module);
        }
        return null;
      }

      return await this.insert(signature, module);
    } catch (err) {
      throw err;
    }
  }
}
