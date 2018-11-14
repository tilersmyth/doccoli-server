import { ResolverMap } from "../../../../types/graphql-utils";
import { Project } from "../../../../entity/Project";

export const resolvers: ResolverMap = {
  Query: {
    cliUserProjects: async (_, { user }: any) => {
      console.log("hi");
      if (!user) {
        return [];
      }

      const projects = await Project.createQueryBuilder("project")
        .leftJoinAndSelect("project.teams", "teams")
        .where("teams.user IN(:ids)", { ids: user.id })
        .andWhere("teams.role = 'admin'")
        .getMany();

      return projects;
    }
  }
};
