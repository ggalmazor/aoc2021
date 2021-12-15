export default class Node {
  x;
  y;
  key;
  risk;
  visited;
  distance;

  constructor(x, y, risk, visited, distance) {
    this.x = x;
    this.y = y;
    this.key = `${x},${y}`;
    this.risk = risk;
    this.visited = visited;
    this.distance = distance;
  }
}
