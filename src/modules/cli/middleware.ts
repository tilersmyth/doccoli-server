import * as jwt from "jsonwebtoken";

import { User } from "../../entity/User";

export const cliUserAuthMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const token = context.req.get("Authorization");

  try {
    if (!token) {
      // user is not logged in
      return null;
    }

    const decoded = jwt.verify(token, process.env
      .SESSION_SECRET as string) as any;

    const user = await User.findOne({ where: { id: decoded.user } });

    if (!user) {
      return null;
    }

    context.user = user;
  } catch (err) {
    console.log(err);
    return null;
  }

  return resolve(parent, args, context, info);
};
