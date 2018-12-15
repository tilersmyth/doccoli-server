import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { ModuleFile } from "./components/ModuleFile";
import { ModuleCommit } from "./components/ModuleCommit";

interface PublishArgs {
  file: any;
  commit: { sha: string; branch: string };
  progress: { size: number; index: number };
}

export const resolvers: ResolverMap = {
  Mutation: {
    cliPublishCreate: async (
      _,
      { file, commit, progress }: PublishArgs,
      { user, project }: any
    ) => {
      try {
        if (!user) {
          throw "user not authenticated";
        }

        console.log("file", file);
        console.log("commit", commit);
        console.log("progress", progress);

        return await getConnection().transaction(async transaction => {
          const savedFile = await new ModuleFile(
            project,
            file,
            transaction
          ).save();

          console.log("SAVED!!", savedFile);

          await new ModuleCommit(project, commit, progress, transaction).save();

          return true;
        });
      } catch (err) {
        throw err;
      }
    }
  }
};
