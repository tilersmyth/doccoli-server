import { ResolverMap } from "../../../../types/graphql-utils";
import { FileNodeEntity } from "../../../../entity/nodes/File";

export const resolvers: ResolverMap = {
  Mutation: {
    updateAndFindAll: async (
      _,
      { modified, deletes }: any,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        // Delete (cascade) files
        if (deletes.length > 0) {
          console.log("delete files here");
        }

        const files = await FileNodeEntity.createQueryBuilder("module_files")
          .where("module_files.project = :id", { id: project.id })
          .andWhere("module_files.path IN (:...modified)", { modified })
          .select(["module_files.path"])
          .getMany();

        return { files };
      } catch (error) {
        return { error };
      }
    }
  }
};
