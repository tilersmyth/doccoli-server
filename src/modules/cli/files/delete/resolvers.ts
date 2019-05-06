import { ResolverMap } from "../../../../types/graphql-utils";
import { FileEntity } from "../../../../entity/File";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteFiles: async (
      _,
      { commitSha, files }: any,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        await FileEntity.createQueryBuilder("files")
          .update()
          .set({ endCommit: commitSha })
          .where("files.project = :id", { id: project.id })
          .andWhere("files.path IN (:...files)", { files });

        return true;
      } catch (error) {
        return { error };
      }
    }
  }
};
