import react, { useState, useEffect } from "react";
import GridNode from "./GridNode";
import Toolbar from "../components/Toolbar";

//Game Master logic should live here
const GridContainer = () => {
  const [startNode, setStartNode] = useState();
  const [endNode, setEndNode] = useState();
  const [flagType, setFlagType] = useState("start");

  //get viewport height and width
  let verticalAxis: number = Math.ceil(
    document.documentElement.clientHeight / 28
  );
  let horizontalAxis: number = Math.ceil(
    document.documentElement.clientWidth / 28
  );

  let column = [];
  for (let y = 0; y < verticalAxis; y++) {
    //need to reset horizontal array each loop
    const rowNodes: Array<JSX.Element> = [];
    //loop generating a horizontal row of nodes which get pushed into above array
    for (let x = 0; x < horizontalAxis; x++) {
      rowNodes.push(
        <GridNode x={x + 1} y={y + 1} key={`node${x}${y}}`}></GridNode>
      );
    }
    //horizontal container all of the nodes created in a row
    let row = (
      <div className="flex" id={`row${y + 1}`} key={`key${y + 1}`}>
        {rowNodes.map((child) => child)}
      </div>
    );
    //vertical container which holds all horizontal containers
    column.push(row);
  }
  return (
    <div id="grid-container" className="flex">
      <div className={`h-svh w-svw bg-light-grey`}>
        {column.map((child) => child)}
      </div>
      <Toolbar setStartNode={setStartNode}></Toolbar>
    </div>
  );
};

export default GridContainer;
