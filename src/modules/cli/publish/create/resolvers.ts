import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { ModuleFileNode, ModuleChildrenNode } from "./components/nodes";
import { PublishCommit } from "./components/PublishCommit";

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
          const moduleCommit = new PublishCommit(
            project,
            commit,
            progress,
            transaction
          );

          const currentCommit = await moduleCommit.find();

          if (currentCommit && currentCommit.index >= progress.index) {
            return true;
          }

          const savedFile = await new ModuleFileNode(
            project,
            file,
            transaction
          ).save();

          for (const children of file.children) {
            await new ModuleChildrenNode(children, null, transaction).save(
              savedFile
            );
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
