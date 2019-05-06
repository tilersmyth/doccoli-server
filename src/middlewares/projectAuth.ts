import { projectAuthMiddleware } from "../modules/project/middleware";

export const projectAuth = {
  Query: {
    cliLastCommit: projectAuthMiddleware,
    cliFindOneFile: projectAuthMiddleware,
    findAllFiles: projectAuthMiddleware
  },
  Mutation: {
    updateAndFindAll: projectAuthMiddleware,
    cliPublishCreate: projectAuthMiddleware,
    cliPublishUpdate: projectAuthMiddleware
  }
};
