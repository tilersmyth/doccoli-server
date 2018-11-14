import * as jwt from "jsonwebtoken";

import { User } from "../../entity/User";

import { notAuthorized } from "./utils/errorMessages";

export const cliAuth = async (
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
      throw notAuthorized;
    }

    const decoded = jwt.verify(token, process.env
      .SESSION_SECRET as string) as any;

    const user = await User.findOne({ where: { id: decoded.user } });

    if (!user) {
      throw notAuthorized;
    }

    args.user = user;
  } catch (err) {
    return { ok: false, errors: [err] };
  }

  return resolve(parent, args, context, info);
};
