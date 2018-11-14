import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { ResolverMap } from "../../../../types/graphql-utils";
import { User } from "../../../../entity/User";
import {
  invalidLogin,
  confirmEmailError,
  forgotPasswordLockedError
} from "../../utils/errorMessages";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    cliLogin: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { errors: errorResponse };
      }

      if (!user.confirmed) {
        return {
          errors: [
            {
              path: "email",
              message: confirmEmailError
            }
          ]
        };
      }

      if (user.forgotPasswordLocked) {
        return {
          errors: [
            {
              path: "email",
              message: forgotPasswordLockedError
            }
          ]
        };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { errors: errorResponse };
      }

      const token = jwt.sign({ user: user.id }, process.env
        .SESSION_SECRET as string);

      return { token };
    }
  }
};
