import { useState, useEffect } from "react";
import GridNode from "./GridNode";
import { useScreenSize } from "../hooks/useScreenSize";
import { Grid, Node } from "../types/types";

const GridContainer = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const { width, height } = useScreenSize();

  const cellSize = 28;
  const rows = Math.floor(height / cellSize);
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

  const handleNodeClick = (row: number, col: number) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    node.isWall = !node.isWall;
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  return (
    <div
      id="grid-container"
      className="flex justify-center items-center h-screen w-screen bg-light-grey"
    >
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((node, nodeIndex) => (
              <GridNode
                key={nodeIndex}
                {...node}
                onClick={() => handleNodeClick(rowIndex, nodeIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridContainer;

