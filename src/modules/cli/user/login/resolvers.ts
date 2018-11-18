import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ResolverMap } from "../../../../types/graphql-utils";
import { User } from "../../../../entity/User";
import { invalidLogin } from "../../utils/errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    cliLogin: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { error: invalidLogin };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { error: invalidLogin };
      }

      const token = jwt.sign({ user: user.id }, process.env
        .SESSION_SECRET as string);

      return { token };
    }
  }
};
