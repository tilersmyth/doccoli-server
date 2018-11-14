import { ResolverMap } from "../../../../types/graphql-utils";

import { notAuthorized } from "../../utils/errorMessages";

export const resolvers: ResolverMap = {
  Query: {
    cliMe: async (_, { user }: any) => {
      if (!user) {
        return {
          ok: false,
          errors: [notAuthorized]
        };
      }

      return { ok: true, me: user };
    }
  }
};
