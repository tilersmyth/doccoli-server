import {
  ChildrenPositionEntity,
  SignaturePositionEntity,
  ParameterPositionEntity,
  TypePositionEntity
} from "../../../../../entity";

export class PositionEntities {
  constructor(private entity: string) {
    this.entity = entity;
  }

  route() {
    try {
      switch (this.entity) {
        case "children":
          return ChildrenPositionEntity;
        case "signatures":
          return SignaturePositionEntity;
        case "parameters":
          return ParameterPositionEntity;
        case "types":
          return TypePositionEntity;
        default:
          throw Error(
            `entity '${this.entity}' not found in position entity router`
          );
      }
    } catch (err) {
      throw err;
    }
  }
}
