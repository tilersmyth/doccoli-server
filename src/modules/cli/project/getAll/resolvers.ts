import { ResolverMap } from "../../../../types/graphql-utils";
import { Project } from "../../../../entity/Project";

export const resolvers: ResolverMap = {
  Query: {
    cliUserProjects: async (_, __, { user, error }: any) => {
      try {
        if (error) {
          throw error;
        }

        const projects = await Project.createQueryBuilder("project")
          .leftJoinAndSelect("project.teams", "teams")
          .where("teams.user IN(:ids)", { ids: user.id })
          .andWhere("teams.role = 'admin'")
          .getMany();

        return { projects };
      } catch (error) {
        return { error };
      }
    }
  }
};
