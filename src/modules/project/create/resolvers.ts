import { getConnection } from "typeorm";

import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Project } from "../../../entity/Project";
import { Team } from "../../../entity/Team";

import { slugGenerator } from "../../../utils/slugGenerator";
import { slugInUse } from "../../../utils/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    createProject: async (_, { name, slug }: any, { session }) => {
      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        throw new Error("not authenticated");
      }

      if (slug) {
        const existingSlug = await Project.findOne({
          where: { slug }
        });

        if (existingSlug) {
          return {
            ok: false,
            errors: [
              {
                path: "slug",
                message: slugInUse
              }
            ]
          };
        }
      } else {
        slug = await slugGenerator(name, Project);
      }

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
