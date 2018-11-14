import { getConnection } from "typeorm";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Project } from "../../../entity/Project";
import { Team } from "../../../entity/Team";

export const resolvers: ResolverMap = {
  Mutation: {
    createProject: async (_, { name }: any, { session }) => {
      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        throw new Error("not authenticated");
      }

      try {
        return await getConnection().transaction(
          async transactionalEntityManager => {
            const project = Project.create({
              name,
              slug: "test-slug"
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
              id: response.id
            };
          }
        );
      } catch (e) {
        return {
          ok: false,
          errors: ["Server error"]
        };
      }
    }
  }
};
