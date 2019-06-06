import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { PublishCommit } from "../utility/Commit";
import { UpdateNode } from "./Update";
import { ModuleFileNode } from "../utility/nodes/File";

interface PublishArgs {
  commit: { sha: string; branch: string };
  version: string;
  file: any;
  progress: { total: number; published: number };
}

export const resolvers: ResolverMap = {
  Mutation: {
    cliPublishUpdate: async (
      _,
      { commit, file, progress }: PublishArgs,
      { project, error }: any
    ) => {
      if (error) {
        const err = {
          path: "server",
          message: error.message
        };
        return { error: err };
      }

      return getConnection().transaction(async transaction => {
        try {
          const moduleCommit = new PublishCommit(
            project,
            commit,
            progress,
            transaction
          );

          const currentCommit = await moduleCommit.find();

          // This node is already updated, skip
          if (currentCommit && currentCommit.published >= progress.published) {
            return { created: true };
          }

          const commitModule = await moduleCommit.save(currentCommit);

          // if (file.path === "src/find-options/FindOneOptions.ts") {
          const fileNode = new ModuleFileNode(commitModule, transaction);
          const fileModule = await fileNode.find(project, file.path);

          if (!fileModule) {
            throw Error(`File not found: ${file.path}`);
          }

          const updateNode = new UpdateNode(commitModule, transaction);

          const entities = [
            { id: file.id, entity: "file", entityId: fileModule.id }
          ];

          const queryResults = await file.query.reduce(
            updateNode.find,
            Promise.resolve({ entities, error: null })
          );

          if (queryResults.error) {
            return {
              error: {
                path: "update_fail",
                message: `Update failed: ${queryResults.error}`
              }
            };
          }

          return { success: true };
        } catch (error) {
          const err = {
            path: "server",
            message: error.message
          };
          return { error: err };
        }
      });
    }
  }
};
