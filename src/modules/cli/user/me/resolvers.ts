import { ResolverMap } from "../../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    cliMe: async (_, __, { user, error }: any) => {
      if (error) {
        return { error };
      }
      return { user };
    }
  }
};
