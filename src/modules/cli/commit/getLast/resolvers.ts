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

        const lastCommitOnBranch = await Commit.findOne({
          where: { project, branch, complete: true },
          order: {
            createdAt: "DESC"
          }
        });

        if (lastCommitOnBranch) {
          return { project, user, commit: lastCommitOnBranch, branches: [] };
        }

        const allCommits = await Commit.find({
          where: { project, complete: true },
          select: ["branch"]
        });

        const branches = allCommits.map((commit: Commit) => commit.branch);

        return { project, user, commit: null, branches };
      } catch (error) {
        return { error };
      }
    }
  }
};
