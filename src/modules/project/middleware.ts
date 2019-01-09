import { Project } from "../../entity/Project";
import { Team } from "../../entity/Team";

export const projectAuthMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    if (context.error) {
      throw context.error;
    }

    const key = context.req.get("ProjectKey");

    const team = await Team.findOne({
      where: { projectId: key, userId: context.user.id }
    });

    if (!team) {
      throw {
        path: "projectAuth",
        message: "not authorized for project"
      };
    }

    const project = await Project.findOne({
      where: { key }
    });

    if (!project) {
      throw { path: "projectNotFound", message: "project not found" };
    }

    context.project = project;

    return resolve(parent, args, context, info);
  } catch (err) {
    context.error = err;
    return resolve(parent, args, context, info);
  }
};
