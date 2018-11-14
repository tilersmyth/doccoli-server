import { ResolverMap } from "../../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    cliMe: async (_, { user }: any) => {
      return user;
    }
  }
};
