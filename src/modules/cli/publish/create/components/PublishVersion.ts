import { EntityManager } from "typeorm";
import { VersionEntity } from "../../../../../entity/Version";

export class PublishVersion {
  project: any;
  transaction: EntityManager;

  constructor(project: any, transaction: EntityManager) {
    this.project = project;
    this.transaction = transaction;
  }

  async save(label: string, commit: any) {
    const version = await VersionEntity.findOne({
      where: { project: this.project.id, label }
    });

    if (version) {
      version.commits = [commit];
      return this.transaction.save(version);
    }

    const newVersion = new VersionEntity();
    newVersion.label = label;
    newVersion.project = this.project;
    newVersion.commits = [commit];

    return this.transaction.save(newVersion);
  }
}
