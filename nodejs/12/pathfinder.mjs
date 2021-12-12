class Node {
  constructor(key) {
    this.key = key;
    this.size = key === key.toLowerCase() ? 'small' : 'big';
  }

  hasKey(key) {
    return this.key === key;
  }

  hasSize(size) {
    return this.size === size;
  }

  equals(other) {
    return other instanceof Node && this.key === other.key;
  }
}

class Connection {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  has(node) {
    return this.a.equals(node) || this.b.equals(node);
  }

  getNodeConnectedTo(node) {
    if (!this.has(node))
      throw new Error(`Node ${node} is not a member of this connection between ${this.a} and ${this.b}`);

    return this.a.equals(node) ? this.b : this.a;
  }
}

export class Connections {
  constructor(connections = []) {
    this.connections = connections;
  }

  static parse(lines) {
    return new Connections(lines.map(link => {
      return new Connection(...(link.split('-').map(key => new Node(key))));
    }));
  }

  getNodesConnectedTo(node) {
    return this.connections.filter(connection => connection.has(node)).map(connection => connection.getNodeConnectedTo(node));
  }

  findPaths(from, to, canVisitSmallCavesTwice = false) {
    const paths = [];
    const pendingPaths = [Path.start(from)];
    while (pendingPaths.length > 0) {
      const path = pendingPaths.shift();
      const lastNode = path.lastNode();
      if (lastNode.hasKey(to)) {
        paths.push(path);
      } else {
        const connectedNodes = this.getNodesConnectedTo(lastNode).filter(node => path.canVisit(node, canVisitSmallCavesTwice));
        const newPaths = connectedNodes.map(node => path.forkThrough(node));
        newPaths.forEach(path => pendingPaths.push(path));
      }
    }
    return paths;
  }
}

class Path {
  constructor(nodes, smallCaveVisitedTwice) {
    this.nodes = nodes;
    this.smallCaveVisitedTwice = smallCaveVisitedTwice;
  }

  static start(node) {
    return new Path([new Node(node)], false);
  }

  lastNode() {
    return this.nodes[this.nodes.length - 1];
  }

  includes(node) {
    return this.nodes.some(n => n.equals(node));
  }

  canVisit(node, canVisitSmallCavesTwice) {
    if (node.hasKey("start"))
      return false;

    if (node.hasSize("big"))
      return true;

    if (node.hasSize("small") && !this.includes(node))
      return true;

    if (canVisitSmallCavesTwice && !this.smallCaveVisitedTwice)
      return true;

    return false;
  }

  forkThrough(node) {
    const smallCaveVisitedTwice = this.smallCaveVisitedTwice || (node.hasSize("small") && this.includes(node))
    const newNodes = [...this.nodes].concat([node]);
    return new Path(newNodes, smallCaveVisitedTwice);
  }
}
