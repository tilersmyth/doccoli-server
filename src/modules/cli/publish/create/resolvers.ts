import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { ModuleFile } from "./components/ModuleFile";
import { ModuleCommit } from "./components/ModuleCommit";
import { ModuleChildren } from "./components/ModuleChildren";

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

        return await getConnection().transaction(async transaction => {
          const moduleCommit = new ModuleCommit(
            project,
            commit,
            progress,
            transaction
          );

          const currentCommit = await moduleCommit.find();

          if (currentCommit && currentCommit.index >= progress.index) {
            return true;
          }

          const savedFile = await new ModuleFile(
            project,
            file,
            transaction
          ).save();

          for (const children of file.children) {
            await new ModuleChildren(
              savedFile,
              children,
              null,
              transaction
            ).save();
          }

          await moduleCommit.save(currentCommit);

          return true;
        });
      } catch (err) {
        throw err;
      }
    }
  }
};
