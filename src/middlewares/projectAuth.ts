import { projectAuthMiddleware } from "../modules/project/middleware";

export const projectAuth = {
  Query: {
    cliLastCommit: projectAuthMiddleware,
    cliFindOneFile: projectAuthMiddleware
  },
  Mutation: {
    cliPublishCreate: projectAuthMiddleware
  }
};
