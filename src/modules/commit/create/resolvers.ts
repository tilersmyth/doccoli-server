import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Project } from "../../../entity/Project";
import { Commit } from "../../../entity/Commit";

// Create dummy commit for testing
export const resolvers: ResolverMap = {
  Mutation: {
    createCommit: async (_, { projectId, sha, branch }: any, { session }) => {
      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        throw new Error("not authenticated");
      }

      const project = await Project.findOne({ where: { key: projectId } });

      if (!project) {
        throw new Error("project not found");
      }

      try {
        const commit = new Commit();
        commit.project = project;
        commit.sha = sha;
        commit.branch = branch;
        await commit.save();

        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
