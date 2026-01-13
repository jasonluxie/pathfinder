import { Grid, Node } from "../types/types";

export function astar(
  grid: Grid,
  startNode: Node,
  endNode: Node
): { visitedNodesInOrder: Node[]; shortestPath: Node[] } {
  const visitedNodesInOrder: Node[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes, endNode);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode || closestNode.isWall) continue;

    if (closestNode.distance === Infinity) {
      return { visitedNodesInOrder, shortestPath: [] };
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: getNodesInShortestPathOrder(endNode),
      };
    }

    updateUnvisitedNeighbors(closestNode, grid, endNode);
  }

  return { visitedNodesInOrder, shortestPath: [] };
}

function getAllNodes(grid: Grid): Node[] {
  const nodes: Node[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes: Node[], endNode: Node) {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance + manhattanDistance(nodeA, endNode) -
      (nodeB.distance + manhattanDistance(nodeB, endNode))
  );
}

function updateUnvisitedNeighbors(node: Node, grid: Grid, endNode: Node) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: Node, grid: Grid): Node[] {
  const neighbors: Node[] = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getNodesInShortestPathOrder(endNode: Node): Node[] {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node | null = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

function manhattanDistance(nodeA: Node, nodeB: Node) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}
