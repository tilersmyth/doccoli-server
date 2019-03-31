import { EntityManager } from "typeorm";

import { SignatureNodeEntity } from "../../../../../../entity/nodes/Signature";
import { ModuleCommentNode, ModuleTypeNode, ModuleParameterNode } from "./";

export class ModuleSignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  async save(
    signature: any,
    module?: any
  ): Promise<SignatureNodeEntity | null> {
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

  private async create(signature: any) {
    const newSignature = new SignatureNodeEntity();
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

  private async insert(
    signature: any,
    node: any
  ): Promise<SignatureNodeEntity> {
    const newSignature = await this.create(signature);
    newSignature.startCommit = this.commit.id;
    newSignature.node = node;
    const savedSignature = await this.transaction.save(newSignature);
    await this.parameters(savedSignature, signature);
    return savedSignature;
  }
}
