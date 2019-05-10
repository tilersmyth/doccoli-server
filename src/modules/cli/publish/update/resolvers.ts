import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";

import { PublishCommit } from "../utility/Commit";
import { ModuleFileNode } from "../utility/nodes/File";

import { NodeQuery } from "./Query";
import { NodeUpdatePublish } from "./Publish";

interface PublishArgs {
  commit: { sha: string; branch: string };
  version: string;
  file: any;
  progress: { nodesTotal: number; nodesPublished: number };
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
          if (
            currentCommit &&
            currentCommit.nodesPublished >= progress.nodesPublished
          ) {
            return { created: true };
          }

          const commitModule = await moduleCommit.save(currentCommit);

          const fileNode = new ModuleFileNode(commitModule, transaction);
          const fileModule = await fileNode.find(project, file);

          if (!fileModule) {
            throw Error(`file not found: ${file.path}`);
          }

          const nodeQuery = new NodeQuery(fileModule);

          const publish = new NodeUpdatePublish(commitModule, transaction);

          for (const update of file.updates) {
            const queryBuilder = nodeQuery.build(update.query);
            const nestedResults = await queryBuilder.getOne();

            if (!nestedResults) {
              throw Error(
                "Unable to locate target for update node with provided query"
              );
            }

            const nodeConnector = nodeQuery.results(
              update.query,
              nestedResults
            );

            // To do: include options to handle added/delete nodes

            if (update.kind === "modified") {
              await publish.save(nodeConnector, update.newNode);
            }
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
