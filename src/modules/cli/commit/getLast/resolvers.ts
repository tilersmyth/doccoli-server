import { ResolverMap } from "../../../../types/graphql-utils";
import { Commit } from "../../../../entity/Commit";

export const resolvers: ResolverMap = {
  Query: {
    cliLastCommit: async (_, { branch }: any, { project }: any) => {
      try {
        if (!project) {
          throw "project not found";
        }

        return await Commit.findOne({
          where: { project: project.id, branch },
          order: {
            createdAt: "DESC"
          }
        });
      } catch (e) {
        console.log("server error");
        return null;
      }
    }
  }
};
