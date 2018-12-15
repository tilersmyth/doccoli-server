import { projectAuthMiddleware } from "../modules/project/middleware";

export const projectAuth = {
  Query: {
    cliLastCommit: projectAuthMiddleware
  },
  Mutation: {
    cliPublishCreate: projectAuthMiddleware
  }
};
