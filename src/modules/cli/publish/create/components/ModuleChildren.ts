import { EntityManager } from "typeorm";
import { Module } from "../../../../../entity/Module";
import { Comment } from "./Comment";
import { Type } from "./Type";
import { Signature } from "./Signature";
import { Parameter } from "./Parameter";

export class ModuleChildren {
  file: any;
  children: any;
  parent: any;
  transaction: EntityManager;

  constructor(
    file: any,
    children: any,
    parent: any,
    transaction: EntityManager
  ) {
    this.file = file;
    this.children = children;
    this.parent = parent;
    this.transaction = transaction;
  }

  async save() {
    try {
      // Save child module
      const module = new Module();
      const signature = new Signature(this.transaction);
      module.name = this.children.name;
      module.comment = await new Comment(
        this.children.comment,
        this.transaction
      ).save();
      module.parent = this.parent;
      module.type = await new Type(this.children.type, this.transaction).save();
      module.indexSignature = await signature.save(
        this.children.indexSignature
      );
      module.getSignature = await signature.save(this.children.getSignature);
      module.file = this.file;

      const savedModule = await this.transaction.save(module);

      // Save child module parameters
      if (this.children.typeParameter) {
        for (const param of this.children.typeParameter) {
          const parameter = await new Parameter(
            param,
            this.transaction
          ).create();
          parameter.module = savedModule;
          await this.transaction.save(parameter);
        }
      }

      // Save child module signatures
      if (this.children.signatures) {
        for (const sig of this.children.signatures) {
          const newSignature = await signature.create(sig);
          newSignature.module = savedModule;
          await this.transaction.save(newSignature);
        }
      }

      // Save child module children descendents
      if (this.children.children) {
        for (const children of this.children.children) {
          await new ModuleChildren(
            this.file,
            children,
            savedModule,
            this.transaction
          ).save();
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
