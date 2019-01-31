import { ResolverMap } from "../../../../types/graphql-utils";
import { ModuleFile } from "../../../../entity/modules/ModuleFile";

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

        const files = await ModuleFile.createQueryBuilder("module_files")
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
