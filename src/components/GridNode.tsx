import { Node } from "../types/types";

interface GridNodeProps extends Node {
  onClick: () => void;
}

const GridNode = ({
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
  onClick,
}: GridNodeProps) => {
  const classes = `node w-7 h-7 border border-gray-400 transition-colors ${
    isStart
      ? "bg-green-500"
      : isEnd
      ? "bg-red-500"
      : isWall
      ? "bg-gray-800"
      : isPath
      ? "bg-yellow-400"
      : isVisited
      ? "bg-blue-300"
      : "bg-gray-200 hover:bg-gray-300"
  }`;

  return <div className={classes} onClick={onClick}></div>;
};

export default GridNode;
