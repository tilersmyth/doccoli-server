import { cliAuth } from "../modules/cli/middleware";

export const middleware = {
  Query: {
    cliMe: cliAuth,
    cliUserProjects: cliAuth
  }
};
