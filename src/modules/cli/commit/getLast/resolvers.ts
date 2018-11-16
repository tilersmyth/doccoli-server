import { getConnection } from "typeorm";

import { ResolverMap } from "../../../../types/graphql-utils";
import { Commit } from "../../../../entity/Commit";
import { Project } from "../../../../entity/Project";

export const resolvers: ResolverMap = {
  Query: {
    cliLastCommit: async (_, { projectId }: any) => {
      try {
        const project = await Project.findOne({ where: { key: projectId } });

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
