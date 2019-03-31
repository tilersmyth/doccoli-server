// import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../../types/graphql-utils";

interface UpdateCommentArgs {
  comment: any;
  commit: { sha: string; branch: string };
  progress: { size: number; index: number };
}

export const resolvers: ResolverMap = {
  Mutation: {
    cliPublishUpdateComment: async (
      _,
      { comment, commit, progress }: UpdateCommentArgs,
      { project, error }: any
    ) => {
      try {
        if (error) {
          throw error;
        }

        console.log(project);
        console.log(comment, commit, progress);

        return true;
        // return await getConnection().transaction(async transaction => {

        // });
      } catch (error) {
        return { error };
      }
    }
  }
};
