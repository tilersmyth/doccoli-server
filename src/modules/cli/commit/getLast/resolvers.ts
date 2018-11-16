import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";
import { Commit } from "../../../../entity/Commit";

export const resolvers: ResolverMap = {
  Query: {
    cliLastCommit: async (_, __, { project }: any) => {
      try {
        if (!project) {
          throw "project not found";
        }

        return await getConnection()
          .createQueryBuilder()
          .select("commit")
          .from(Commit, "commit")
          .where("commit.project = :project", { project: project.id })
          .orderBy("commit.createdAt", "DESC")
          .getOne();
      } catch (e) {
        console.log("server error");
        return null;
      }
    }
  }
};
