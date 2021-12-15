export function dijkstra(grid, initialX, initialY, destinationX, destinationY) {
  const unvisitedNodes = {};
  const destinationNode = grid.valueAt(destinationX, destinationY);
  let currentNode = grid.valueAt(initialX, initialY);
  unvisitedNodes[currentNode.key] = currentNode;
  while (currentNode !== undefined && !destinationNode.visited) {
    grid.neighborValuesAt(currentNode.x, currentNode.y, true)
      .filter(node => !node.visited)
      .forEach(node => {
        unvisitedNodes[node.key] = node;
        node.distance = Math.min(node.distance, currentNode.distance + node.risk);
      })
    currentNode.visited = true;
    delete unvisitedNodes[currentNode.key];
    currentNode = Object.values(unvisitedNodes).sort((a, b) => a.distance - b.distance)[0];
  }
  return destinationNode.distance;
}
