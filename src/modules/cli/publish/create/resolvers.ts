import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { ModuleFileNode, ModuleChildrenNode } from "./components/nodes";
import { PublishCommit } from "./components/PublishCommit";
import { PublishVersion } from "./components/PublishVersion";

interface PublishArgs {
  file: any;
  version: string;
  commit: { sha: string; branch: string };
  progress: { nodesTotal: number; nodesPublished: number };
}

export const resolvers: ResolverMap = {
  Mutation: {
    cliPublishCreate: async (
      _,
      { file, version, commit, progress }: PublishArgs,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        return await getConnection().transaction(async transaction => {
          const moduleCommit = new PublishCommit(
            project,
            commit,
            progress,
            transaction
          );

          const currentCommit = await moduleCommit.find();

          if (
            currentCommit &&
            currentCommit.nodesPublished >= progress.nodesPublished
          ) {
            return { created: true };
          }

          const commitModule = await moduleCommit.save(currentCommit);

          if (commitModule.complete) {
            const saveVersion = new PublishVersion(project, transaction);
            await saveVersion.save(version, commitModule);
          }

          const savedFile = await new ModuleFileNode(
            project,
            commitModule,
            file,
            transaction
          ).save();

          for (const children of file.children) {
            await new ModuleChildrenNode(
              commitModule,
              children,
              null,
              transaction
            ).save(savedFile);
          }

          return { created: true };
        });
      } catch (error) {
        return { error };
      }
    }
  }
};
