import { FileEntity, ChildrenNodeConnector } from "../../../../entity";

export class NodeQuery {
  fileEntity: FileEntity;

  constructor(fileEntity: FileEntity) {
    this.fileEntity = fileEntity;
  }

  private argsReduce = (entity: string, acc: any, arg: any) => {
    acc += acc && " AND ";
    acc += `${entity}.${arg.key} = '${arg.value}'`;
    return acc;
  };

  private queryReduce = (acc: any, query: any, index: number, array: any) => {
    const argString = query.args.reduce(
      this.argsReduce.bind(this, `${query.entity}${index}Node`),
      ""
    );

    if (index === 0) {
      acc.where(`${query.entity}${index}.file = '${this.fileEntity.id}'`);

      acc.innerJoinAndSelect(
        `${query.entity}${index}.node`,
        `${query.entity}${index}Node`,
        `${query.entity}${index}Node.endCommit is NULL AND ${argString}`
      );

      return acc;
    }

    const lastEntity = `${array[index - 1].entity}${index - 1}`;

    acc.innerJoinAndSelect(
      `${lastEntity}.${query.entity}`,
      `${query.entity}${index}`
    );

    acc.innerJoinAndSelect(
      `${query.entity}${index}.node`,
      `${query.entity}${index}Node`,
      `${query.entity}${index}Node.endCommit is NULL AND ${argString}`
    );

    return acc;
  };

  private resultsReduce = (acc: any, query: any) => {
    if (acc[query.entity] instanceof Array) {
      if (acc[query.entity].length > 1) {
        throw Error(`More than one result found for "${query.entity}" entity`);
      }

      acc = acc[query.entity][0];
      return acc;
    }

    acc = acc[query.entity];
    return acc;
  };

  build = (query: any) => {
    const childrenEntity = ChildrenNodeConnector.createQueryBuilder(
      "children0"
    );
    return query.reduce(this.queryReduce, childrenEntity);
  };

  results = (query: any, nestedResults: any) => {
    try {
      return query.reduce(this.resultsReduce, { children: nestedResults });
    } catch (error) {
      return { error };
    }
  };
}
