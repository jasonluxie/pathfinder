import React from "react";

interface NodeMetaProps {
  x: number;
  y: number;
  key: string;
}

const GridNode = ({ x, y }: NodeMetaProps) => {
  const nodeLocation = `${x}_${y}`;

  return (
<div
  id={nodeLocation}
  className="node w-7 h-7 border border-gray-400 bg-gray-200 hover:bg-gray-300 transition-colors"
></div>
  );
};

export default GridNode;
