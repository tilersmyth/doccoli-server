import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { PublishCommit } from "../utility/Commit";
import { PublishVersion } from "../utility/Version";
import { EntityBulk } from "./EntityBulk";

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

          const entityBulk = new EntityBulk(commitModule, transaction);

          await entityBulk.insert(project, file);

          return { created: true };
        });
      } catch (error) {
        return { error };
      }
    }
  }
};
