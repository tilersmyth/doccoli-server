import { projectAuthMiddleware } from "../modules/project/middleware";

export const projectAuth = {
  Query: {
    cliLastCommit: projectAuthMiddleware,
    cliFindOneFile: projectAuthMiddleware
  },
  Mutation: {
    updateAndFindAll: projectAuthMiddleware,
    cliPublishCreate: projectAuthMiddleware,
    cliPublishUpdateComment: projectAuthMiddleware
  }
};
