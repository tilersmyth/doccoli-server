import { EntityManager } from "typeorm";
import { ModuleSignature } from "../../../../../entity/ModuleSignature";
import { Comment } from "./Comment";
import { Type } from "./Type";
import { Parameter } from "./Parameter";

export class Signature {
  transaction: EntityManager;

  constructor(transaction: EntityManager) {
    this.transaction = transaction;
  }

  async create(signature: any) {
    const newSignature = new ModuleSignature();
    newSignature.name = signature.name;
    newSignature.kind = signature.kind;
    newSignature.comment = await new Comment(
      signature.comment,
      this.transaction
    ).save();
    newSignature.type = await new Type(signature.type, this.transaction).save();

    if (signature.parameters) {
      for (const param of signature.parameters) {
        const parameter = await new Parameter(param, this.transaction).create();
        parameter.signature = newSignature;
        await this.transaction.save(parameter);
      }
    }

    if (signature.typeParameter) {
      for (const param of signature.typeParameter) {
        const parameter = await new Parameter(param, this.transaction).create();
        parameter.typeSignature = newSignature;
        await this.transaction.save(parameter);
      }
    }

    return newSignature;
  }

  async save(signature: any) {
    try {
      if (!signature) {
        return null;
      }

      const newSignature = await this.create(signature);

      return await this.transaction.save(newSignature);
    } catch (err) {
      throw err;
    }
  }
}
