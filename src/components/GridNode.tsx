import React from "react";

interface NodeMetaProps {
  x: number;
  y: number;
}

const GridNode = ({ x, y }: NodeMetaProps) => {
  const nodeLocation = `${x}_${y}`;

  return <div id={nodeLocation} className="node border border-solid border-indigo-500"></div>;
};

export default GridNode;
