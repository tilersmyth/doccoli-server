import { getConnection } from "typeorm";

import { Team } from "../../../../entity/Team";
import { Project } from "../../../../entity/Project";

import { ResolverMap } from "../../../../types/graphql-utils";
import { slugGenerator } from "../../../../utils/slugGenerator";

export const resolvers: ResolverMap = {
  Mutation: {
    cliCreateProject: async (_, { name }: any, { user }: any) => {
      if (!user) {
        return { ok: false, error: "not authenticated" };
      }

      const slug = await slugGenerator(name, Project);

      try {
        return await getConnection().transaction(
          async transactionalEntityManager => {
            const project = Project.create({
              name,
              slug
            });

            const response = await transactionalEntityManager.save(project);

            const team = Team.create({
              role: "admin",
              project: response,
              user
            });

            await transactionalEntityManager.save(team);

            return {
              ok: true,
              project: response
            };
          }
        );
      } catch (e) {
        return {
          ok: false,
          error: "Server error"
        };
      }
    }
  }
};
