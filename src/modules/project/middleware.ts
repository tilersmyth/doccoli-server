import { Project } from "../../entity/Project";
import { Team } from "../../entity/Team";

export const projectAuthMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.user) {
    throw "user not authenticated";
  }

  const projectId = args.projectId;

  try {
    const team = await Team.findOne({
      where: { projectId, userId: context.user.id }
    });

    if (!team) {
      throw new Error("not authorized for project");
    }

    const project = await Project.findOne({
      where: { key: projectId }
    });

    if (!project) {
      throw "project not found";
    }

    context.project = project;
  } catch (err) {
    throw err;
  }

  return resolve(parent, args, context, info);
};
