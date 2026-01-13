import { useState, useEffect } from "react";
import GridNode from "./GridNode";
import { useScreenSize } from "../hooks/useScreenSize";
import { Grid, Node, Algorithm } from "../types/types";
import Toolbar from "./Toolbar";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";

const GridContainer = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [startNode, setStartNode] = useState<Node | null>(null);
  const [endNode, setEndNode] = useState<Node | null>(null);
  const [activeTool, setActiveTool] = useState<"start" | "end" | "wall">(
    "wall"
  );
  const [algorithm, setAlgorithm] = useState<Algorithm>("dijkstra");
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const { width, height } = useScreenSize();

  const cellSize = 28;
  const rows = Math.floor((height - 80) / cellSize);
  const cols = Math.floor(width / cellSize);

  useEffect(() => {
    const newGrid = createGrid(rows, cols);
    setGrid(newGrid);
  }, [rows, cols]);

  const createGrid = (rows: number, cols: number) => {
    const grid: Grid = [];
    for (let row = 0; row < rows; row++) {
      grid.push([]);
      for (let col = 0; col < cols; col++) {
        grid[row].push(createNode(row, col));
      }
    }
    return grid;
  };

  const createNode = (row: number, col: number): Node => {
    return {
      row,
      col,
      isStart: false,
      isEnd: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
    };
  };

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizing) return;
    setIsMousePressed(true);
    handleNodeClick(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizing || !isMousePressed) return;
    handleNodeClick(row, col);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const handleNodeClick = (row: number, col: number) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if (activeTool === "start") {
      if (startNode) {
        newGrid[startNode.row][startNode.col].isStart = false;
      }
      node.isStart = true;
      setStartNode(node);
    } else if (activeTool === "end") {
      if (endNode) {
        newGrid[endNode.row][endNode.col].isEnd = false;
      }
      node.isEnd = true;
      setEndNode(node);
    } else {
      node.isWall = !node.isWall;
    }

    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const clearGrid = () => {
    if (isVisualizing) return;
    const newGrid = createGrid(rows, cols);
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  };

  const visualizePath = () => {
    if (!startNode || !endNode || isVisualizing) return;

    setIsVisualizing(true);
    const { visitedNodesInOrder, shortestPath } =
      algorithm === "dijkstra"
        ? dijkstra(grid, startNode, endNode)
        : astar(grid, startNode, endNode);

    animate(visitedNodesInOrder, shortestPath);
  };

  const animate = (
    visitedNodesInOrder: Node[],
    shortestPath: Node[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        newGrid[node.row][node.col].isVisited = true;
        setGrid(newGrid);
      }, 10 * i);
    }
  };

  const animateShortestPath = (shortestPath: Node[]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const newGrid = grid.slice();
        newGrid[node.row][node.col].isPath = true;
        setGrid(newGrid);
      }, 50 * i);
    }
    setIsVisualizing(false);
  };

  return (
    <div
      id="grid-container"
      className="flex flex-col justify-center items-center h-screen w-screen bg-light-grey"
      onMouseUp={handleMouseUp}
    >
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((node, nodeIndex) => (
              <GridNode
                key={nodeIndex}
                {...node}
                onMouseDown={() => handleMouseDown(rowIndex, nodeIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, nodeIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        startPathfinding={visualizePath}
        clearGrid={clearGrid}
        isVisualizing={isVisualizing}
      />
    </div>
  );
};

export default GridContainer;

