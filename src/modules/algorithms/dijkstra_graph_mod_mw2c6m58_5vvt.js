class WeightedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(node1, node2, weight) {
    this.addVertex(node1);
    this.addVertex(node2);
    this.adjacencyList.get(node1).push({ node: node2, weight });
    this.adjacencyList.get(node2).push({ node: node1, weight });
  }

  shortestPath(start, finish) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const nodes = new Set();

    for (const vertex of this.adjacencyList.keys()) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      nodes.add(vertex);
    }

    while (nodes.size > 0) {
      let smallest = null;
      for (const node of nodes) {
        if (smallest === null || distances[node] < distances[smallest]) {
          smallest = node;
        }
      }

      if (smallest === null || distances[smallest] === Infinity) break;
      if (smallest === finish) {
        const path = [];
        let curr = finish;
        while (curr) {
          path.push(curr);
          curr = previous[curr];
        }
        return { distance: distances[finish], path: path.reverse() };
      }

      nodes.delete(smallest);
      visited.add(smallest);

      for (const neighbor of this.adjacencyList.get(smallest)) {
        if (visited.has(neighbor.node)) continue;
        const alt = distances[smallest] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = smallest;
        }
      }
    }

    return { distance: Infinity, path: [] };
  }
}

module.exports = { version: "mod_mw2c6m58_5vvt", WeightedGraph };
