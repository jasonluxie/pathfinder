import React from "react";
import GridNode from "./GridNode";
//State -> grid holder will take the viewport height and width to attemp to create a box that doesn't touch the edges
//Shape of grid will depend on device viewing, some remainder math to figure out how many boxes will actually generate
//Pass state as a width x height prop

// interface containerMetaProps {}

const GridContainer = () => {
  //get viewport height and width
  let verticalAxis = Math.floor(document.documentElement.clientHeight / 28);
  let horizontalAxis = Math.floor(document.documentElement.clientWidth / 28);
  //   console.log("vertical", verticalAxis);
  //   console.log("horizontal", horizontalAxis);
  //   console.log("total cubes", verticalAxis * horizontalAxis);

  let column = [];
  let x = 1;
  for (let y = 0; y < verticalAxis; y++) {
    //need to reset horizontal array each loop
    const rowNodes: Array<JSX.Element> = [];
    for (let x = 0; x < horizontalAxis; x++) {
      rowNodes.push(
        <GridNode x={x + 1} y={y + 1} key={`node${x}${y}}`}></GridNode>
      );
    }

    let row = (
      <div className="flex" id={`row${x}`}>
        {rowNodes.map((child) => child)}
      </div>
    );
    column.push(row);
    x++;
  }
  return (
    <>
      <div className={`h-svh w-svw`}>{column.map((child) => child)}</div>
    </>
  );
};

export default GridContainer;
