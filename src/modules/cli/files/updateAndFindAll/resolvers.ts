import { ResolverMap } from "../../../../types/graphql-utils";
import { ModuleFile } from "../../../../entity/modules/ModuleFile";

export const resolvers: ResolverMap = {
  Mutation: {
    updateAndFindAll: async (
      _,
      { renames, deletes }: any,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        // Update file names
        if (renames.length > 0) {
          console.log("update file names here");
        }

        // Delete (cascade) files
        if (deletes.length > 0) {
          console.log("delete files here");
        }

        const files = await ModuleFile.createQueryBuilder("module_files")
          .where("module_files.project = :id", { id: project.id })
          .select(["module_files.path"])
          .getMany();

        return { files };
      } catch (error) {
        return { error };
      }
    }
  }
};
