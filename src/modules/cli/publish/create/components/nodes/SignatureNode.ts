import { EntityManager } from "typeorm";

import { ModuleSignature } from "../../../../../../entity/modules/ModuleSignature";
import { ModuleCommentNode, ModuleTypeNode, ModuleParameterNode } from "./";

export class ModuleSignatureNode {
  transaction: EntityManager;

  constructor(transaction: EntityManager) {
    this.transaction = transaction;
  }

  private async create(signature: any) {
    const newSignature = new ModuleSignature();
    newSignature.name = signature.name;
    newSignature.kind = signature.kind;
    newSignature.comment = await new ModuleCommentNode(
      signature.comment,
      this.transaction
    ).save();
    newSignature.type = await new ModuleTypeNode(
      signature.type,
      this.transaction
    ).save();

    return newSignature;
  }

  private async parameters(node: any, signature: any) {
    if (signature.parameters) {
      for (const param of signature.parameters) {
        const parameter = await new ModuleParameterNode(
          param,
          this.transaction
        ).create();

        parameter.signature = node;

        await this.transaction.save(parameter);
      }
    }

    if (signature.typeParameter) {
      for (const param of signature.typeParameter) {
        const parameter = await new ModuleParameterNode(
          param,
          this.transaction
        ).create();
        parameter.typeSignature = node;
        await this.transaction.save(parameter);
      }
    }
  }

  private async insert(signature: any, module: any): Promise<ModuleSignature> {
    const newSignature = await this.create(signature);
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
