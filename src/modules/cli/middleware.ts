import * as jwt from "jsonwebtoken";

import { User } from "../../entity/User";

export const cliUserAuthMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    const token = context.req.get("Authorization");

    if (!token) {
      // user is not logged in
      throw {
        path: "userAuth",
        message: "user not authenticated"
      };
    }

    const decoded = jwt.verify(token, process.env
      .SESSION_SECRET as string) as any;

    const user = await User.findOne({ where: { id: decoded.user } });

    if (!user) {
      throw {
        path: "userAuth",
        message: "user not authenticated"
      };
    }

    context.user = user;

    return resolve(parent, args, context, info);
  } catch (err) {
    context.error = err;
    return resolve(parent, args, context, info);
  }
};
