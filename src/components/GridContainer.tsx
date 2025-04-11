import react, { useState, useEffect } from "react";
import GridNode from "./GridNode";
import Toolbar from "../components/Toolbar";

const GridContainer = () => {
  const [startNode, setStartNode] = useState();
  const [endNode, setEndNode] = useState();
  const [activeFlag, setActiveFlag] = useState("start");
  const [startFlagNode, setStartFlagNode] = useState("");
  const [endFlagNode, setEndFlagNode] = useState("");

  const cellSize = 28; 
  const verticalAxis = Math.floor(window.innerHeight / cellSize);
  const horizontalAxis = Math.floor(window.innerWidth / cellSize);

  const column = [];
  for (let y = 0; y < verticalAxis; y++) {
    const rowNodes: Array<JSX.Element> = [];
    for (let x = 0; x < horizontalAxis; x++) {
      rowNodes.push(
        <GridNode x={x + 1} y={y + 1} key={`node${x}${y}`} />
      );
    }
    const row = (
      <div className="flex" id={`row${y + 1}`} key={`key${y + 1}`}>
        {rowNodes}
      </div>
    );
    column.push(row);
  }

  return (
    <div
      id="grid-container"
      className="flex justify-center items-center h-screen w-screen bg-light-grey"
    >
      <div className="grid-container">
        {column.map((child) => child)}
      </div>
      <Toolbar props={setStartNode, setEndNode, setActiveFlag}></Toolbar>
    </div>
  );
};

export default GridContainer;
