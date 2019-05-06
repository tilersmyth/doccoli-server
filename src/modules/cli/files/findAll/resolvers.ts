import { ResolverMap } from "../../../../types/graphql-utils";

import { FileEntity } from "../../../../entity/File";

export const resolvers: ResolverMap = {
  Query: {
    findAllFiles: async (_, __, { project, error }: any) => {
      try {
        if (error) {
          throw error;
        }

        const files = await FileEntity.createQueryBuilder("files")
          .where("files.project = :id", { id: project.id })
          .andWhere("files.endCommit IS NUll")
          .getMany();

        if (files.length === 0) {
          return { files: [] };
        }

        return { files: files.map((file: any) => file.path) };
      } catch (err) {
        throw err;
      }
    }
  }
};
