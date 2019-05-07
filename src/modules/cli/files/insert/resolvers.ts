import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";
import { FileEntity } from "../../../../entity/File";
import { PublishCommit } from "../../publish/utility/Commit";

export const resolvers: ResolverMap = {
  Mutation: {
    insertFiles: async (_, { commit, files }: any, { project, error }: any) => {
      try {
        if (error) {
          throw error;
        }

        return await getConnection().transaction(async transaction => {
          const moduleCommit = new PublishCommit(
            project,
            commit,
            { nodesPublished: 0, nodesTotal: files.length },
            transaction
          );

          const startCommit = await moduleCommit.save();

          const insertFiles = files.map((file: any) => {
            return { ...file, startCommit, project };
          });

          await transaction
            .createQueryBuilder()
            .insert()
            .into(FileEntity)
            .values(insertFiles)
            .execute();

          return true;
        });
      } catch (error) {
        return { error };
      }
    }
  }
};
