import { ResolverMap } from "../../../../types/graphql-utils";

import { FileEntity } from "../../../../entity/File";

export const resolvers: ResolverMap = {
  Query: {
    cliFindOneFile: async (_, { filePath }: any, { user, project }: any) => {
      try {
        if (!user) {
          throw Error("user not authenticated");
        }

        const file = await FileEntity.createQueryBuilder("module_files")
          .where("module_files.project = :id", { id: project.id })
          .andWhere("module_files.path = :path", { path: filePath })
          .leftJoinAndSelect("module_files.children", "children")
          .leftJoinAndSelect("children.comment", "comment")
          .leftJoinAndSelect("children.typeParameter", "children_typeParameter")
          .leftJoinAndSelect(
            "children_typeParameter.type",
            "children_typeParameter_type"
          )
          .leftJoinAndSelect("children.children", "children2")
          .leftJoinAndSelect("children2.comment", "children2_comment")
          .leftJoinAndSelect("children2.signatures", "children2_signatures")
          .leftJoinAndSelect(
            "children2_signatures.comment",
            "children2_signatures_comment"
          )
          .leftJoinAndSelect(
            "children2_signatures.parameters",
            "children2_signatures_parameters"
          )
          .leftJoinAndSelect(
            "children2_signatures_parameters.type",
            "children2_signatures_parameters_type"
          )
          .getOne();

        return file;
      } catch (err) {
        throw err;
      }
    }
  }
};
