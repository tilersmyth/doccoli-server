import { ResolverMap } from "../../../../types/graphql-utils";
import { FileEntity } from "../../../../entity/File";

export const resolvers: ResolverMap = {
  Mutation: {
    updateAndFindAll: async (
      _,
      { commitSha, modified, deleted }: any,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        // If file deleted in published commit, set endCommit
        if (deleted.length > 0) {
          await FileEntity.createQueryBuilder("files")
            .update()
            .set({ endCommit: commitSha })
            .where("files.project = :id", { id: project.id })
            .andWhere("files.path IN (:...deleted)", { deleted });
        }

        const files = await FileEntity.createQueryBuilder("files")
          .where("files.project = :id", { id: project.id })
          .andWhere("files.path IN (:...modified)", { modified })
          .andWhere("files.endCommit IS NULL")
          .select(["files.path"])
          .getMany();

        return { files };
      } catch (error) {
        return { error };
      }
    }
  }
};
