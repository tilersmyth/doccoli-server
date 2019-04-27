import { EntityManager } from "typeorm";

export class NodeUpdatePublish {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  async save(nodeConnector: any, newNode: any) {
    const oldNode = nodeConnector.node[0];

    // This allows us to maintain class instance when copying
    // so we dont have to import every entity we are using
    const oldNodeCopy = Object.assign(
      Object.create(Object.getPrototypeOf(oldNode)),
      oldNode
    );

    // Set endCommit of old node and save
    oldNode.endCommit = this.commit;
    await this.transaction.save(oldNode);

    // Override updated values
    for (const node of newNode) {
      oldNodeCopy[node.key] = node.value;
    }

    // Remove node specific values
    delete oldNodeCopy.id;
    delete oldNodeCopy.createdAt;

    // Set start commit of new node
    oldNodeCopy.startCommit = this.commit;
    const savedNode = await this.transaction.save(oldNodeCopy);

    // Add newly saved node to connector
    nodeConnector.node.push(savedNode);

    await this.transaction.save(nodeConnector);

    return;
  }
}
