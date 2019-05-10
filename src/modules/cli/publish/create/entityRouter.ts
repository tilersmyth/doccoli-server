import {
  FileConnector,
  ChildrenConnector,
  SignatureConnector,
  CommentConnector,
  ParameterConnector,
  TypeConnector
} from "../utility/connectors";

interface EntityRouter {
  [key: string]: any;
}

export const router: EntityRouter = {
  file: FileConnector,
  children: ChildrenConnector,
  comment: CommentConnector,
  signatures: SignatureConnector,
  getSignature: SignatureConnector,
  indexSignature: SignatureConnector,
  parameters: ParameterConnector,
  typeParameter: ParameterConnector,
  type: TypeConnector,
  types: TypeConnector,
  typeArguments: TypeConnector
};
