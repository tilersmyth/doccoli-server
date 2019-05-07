import { ResolverMap } from "../../../../types/graphql-utils";
import { Commit } from "../../../../entity/Commit";

export const resolvers: ResolverMap = {
  Query: {
    cliLastCommit: async (
      _,
      { branch }: any,
      { project, error, user }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        const commit = await Commit.findOne({
          where: { project, branch, complete: true },
          order: {
            createdAt: "DESC"
          }
        });

        return { project, user, commit };
      } catch (error) {
        return { error };
      }
    }
  }
};
