import { cliUserAuthMiddleware } from "../modules/cli/middleware";

export const cliUserAuth = {
  Query: {
    cliMe: cliUserAuthMiddleware,
    cliUserProjects: cliUserAuthMiddleware,
    cliLastCommit: cliUserAuthMiddleware,
    cliFindOneFile: cliUserAuthMiddleware,
    findAllFiles: cliUserAuthMiddleware
  },
  Mutation: {
    cliCreateProject: cliUserAuthMiddleware,
    updateAndFindAll: cliUserAuthMiddleware,
    cliPublishCreate: cliUserAuthMiddleware,
    cliPublishUpdate: cliUserAuthMiddleware,
    insertFiles: cliUserAuthMiddleware
  }
};
