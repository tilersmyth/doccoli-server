// import { FileEntity, ChildrenNodeConnector } from "../../../../entity";
import { EntityManager } from "typeorm";

import { router } from "../create/entityRouter";

export class QueryNode {
  constructor(private commit: any, private transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private static childTypes = ["types", "typeArguments"];

  private static parentEntityFormat(entity: string) {
    return `parent${entity.charAt(0).toUpperCase()}${entity.slice(1)}`;
  }

  private parentEntity = (queryEntity: string, parentEntity: string) => {
    // handle types
    if (QueryNode.childTypes.includes(queryEntity) && parentEntity === "type") {
      return QueryNode.parentEntityFormat(queryEntity);
    }

    if (queryEntity === parentEntity) {
      return QueryNode.parentEntityFormat(parentEntity);
    }

    return parentEntity;
  };

  private static parseNode = (node: any) => {
    const entity = Object.keys(node)[0];
    const value = node[entity];
    const position = value["position"] ? value["position"] : null;

    return { entity, node: value, position };
  };

  select = async (
    query: any,
    parent: any,
    args: string
  ): Promise<{ id: string }> => {
    try {
      const entityInstance = new router[query.entity](
        this.commit,
        this.transaction
      ).entity;

      if (!entityInstance) {
        throw Error(
          `${query.entity} entity instance not found in update router`
        );
      }

      const parentEntity = this.parentEntity(query.entity, parent.entity);

      const entity: any = await this.transaction
        .createQueryBuilder(entityInstance, query.id)
        .select(`${query.id}.id`)
        .where(`${query.id}.${parentEntity} = '${parent.entityId}'`)
        .innerJoin(
          `${query.id}.node`,
          `${query.id}Node`,
          `${query.id}Node.endCommit is NULL AND ${args}`
        )
        .getOne();

      if (!entity) {
        throw Error(`${query.entity} returned undefined`);
      }

      return entity;
    } catch (error) {
      throw error;
    }
  };

  delete = async (entityId: string) => {
    // to do
    console.log("DELETE", entityId);
  };

  modify = async (entityId: string, node: any) => {
    try {
      const parsed = QueryNode.parseNode(node);

      const entityInstance = new router[parsed.entity](
        this.commit,
        this.transaction
      ).nodeEntity;

      const entity: any = await this.transaction
        .createQueryBuilder(entityInstance, "node")
        .where("node.connector = :id", { id: entityId })
        .andWhere("node.endCommit IS NULL")
        .getOne();

      if (!entity) {
        throw Error(`Node entity with connectorId '${entityId}' not found`);
      }

      // Copy values while preserving instance
      const newNode = Object.assign(
        Object.create(Object.getPrototypeOf(entity)),
        { ...entity, ...parsed.node }
      );

      entity.endCommit = this.commit;
      await this.transaction.save(entity).catch((error: any) => {
        throw error;
      });

      // Strip values unique to old node
      delete newNode.id;
      delete newNode.createdAt;

      newNode.startCommit = this.commit;
      newNode.connector = entityId;

      await this.transaction.save(newNode).catch((error: any) => {
        throw error;
      });
    } catch (err) {
      throw err;
    }
  };

  insert = async (entityId: string, node: any) => {
    const parsed = QueryNode.parseNode(node);

    const entityInstance = new router[parsed.entity](
      this.commit,
      this.transaction
    ).nodeEntity;

    if (parsed.position !== null) {
      await this.transaction
        .createQueryBuilder(entityInstance, "node")
        .update()
        .where("node.connector = :id", { id: entityId })
        .andWhere("node.endCommit IS NULL")
        .andWhere(`node.position >= ${parsed.position}`)
        .set({ position: () => "position + 1" })
        .execute();
    }

    console.log("INSERT", entityId, parsed);
  };
}
