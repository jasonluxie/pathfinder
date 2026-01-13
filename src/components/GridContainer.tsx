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
  const [visualizationSpeed, setVisualizationSpeed] = useState<number>(50);
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
      id: `${row}-${col}`,
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
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      const node = newGrid[row][col];
      const newNode = { ...node };

      if (activeTool === "start") {
        if (startNode) {
          newGrid[startNode.row][startNode.col].isStart = false;
        }
        newNode.isStart = true;
        setStartNode(newNode);
      } else if (activeTool === "end") {
        if (endNode) {
          newGrid[endNode.row][endNode.col].isEnd = false;
        }
        newNode.isEnd = true;
        setEndNode(newNode);
      } else {
        newNode.isWall = !newNode.isWall;
      }

      newGrid[row][col] = newNode;
      return newGrid;
    });
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
    let frame = 0;
    const animateFrame = () => {
      if (frame < visitedNodesInOrder.length) {
        const node = visitedNodesInOrder[frame];
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((n) => (n.row === node.row && n.col === node.col ? { ...n, isVisited: true } : n))
          );
          return newGrid;
        });
        frame++;
        setTimeout(() => {
          requestAnimationFrame(animateFrame);
        }, visualizationSpeed);
      } else {
        animateShortestPath(shortestPath);
      }
    };
    requestAnimationFrame(animateFrame);
  };

  const animateShortestPath = (shortestPath: Node[]) => {
    let frame = 0;
    const animateFrame = () => {
      if (frame < shortestPath.length) {
        const node = shortestPath[frame];
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((n) => (n.row === node.row && n.col === node.col ? { ...n, isPath: true } : n))
          );
          return newGrid;
        });
        frame++;
        setTimeout(() => {
          requestAnimationFrame(animateFrame);
        }, visualizationSpeed);
      } else {
        setIsVisualizing(false);
      }
    };
    requestAnimationFrame(animateFrame);
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
            {row.map((node) => (
              <GridNode
                key={node.id}
                {...node}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
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
        visualizationSpeed={visualizationSpeed}
        setVisualizationSpeed={setVisualizationSpeed}
      />
    </div>
  );
};

export default GridContainer;

