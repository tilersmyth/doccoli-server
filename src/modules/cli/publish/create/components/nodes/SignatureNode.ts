import { EntityManager } from "typeorm";

import { SignatureNodeConnectorEntity } from "../../../../../../entity/nodes/SignatureConnector";
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
  ): Promise<SignatureNodeConnectorEntity | null> {
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

  private async create(value: any) {
    const signature = new SignatureNodeEntity();

    signature.name = value.name;
    signature.kind = value.kind;
    signature.startCommit = this.commit;

    const savedSignature = await this.transaction.save(signature);

    const signatureConnector = new SignatureNodeConnectorEntity();
    signatureConnector.node = [savedSignature];

    signatureConnector.comment = await new ModuleCommentNode(
      this.commit,
      value.comment,
      this.transaction
    ).save();
    signatureConnector.type = await new ModuleTypeNode(
      this.commit,
      value.type,
      this.transaction
    ).save();

    return signatureConnector;
  }

  private async parameters(node: any, signature: any) {
    if (signature.parameters) {
      for (const param of signature.parameters) {
        const parameter = await new ModuleParameterNode(
          this.commit,
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
          this.commit,
          param,
          this.transaction
        ).create();

        parameter.typeSignature = node;
        await this.transaction.save(parameter);
      }
    }
  }

  private async insert(
    signature: any,
    node: any
  ): Promise<SignatureNodeConnectorEntity> {
    const signatureConnector = await this.create(signature);

    signatureConnector.children = node;
    const savedSignature = await this.transaction.save(signatureConnector);
    await this.parameters(savedSignature, signature);
    return savedSignature;
  }
}
