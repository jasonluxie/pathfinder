import React from "react";
import GridNode from "./GridNode";
//State -> grid holder will take the viewport height and width to attemp to create a box that doesn't touch the edges
//Shape of grid will depend on device viewing, some remainder math to figure out how many boxes will actually generate
//Pass state as a width x height prop

// interface containerMetaProps {}

const GridContainer = () => {
  //   let verticalAxis = Math.floor(document.documentElement.clientHeight / 28);
  //   let horizontalAxis = Math.floor(document.documentElement.clientWidth / 28);
  //   console.log("vertical", verticalAxis);
  //   console.log("horizontal", horizontalAxis);
  //   console.log("total cubes", verticalAxis * horizontalAxis);
  const rowNodes: Array<JSX.Element> = [];

  for (let j = 0; j < 10; j++) {
      rowNodes.push(<GridNode x={j + 1} y={i + 1} key={`node${j}${i}}`}></GridNode>);
    }


  return (
    <>
      <div className={`h-svh w-svw flex`}>{rowNodes}</div>
    </>
  );
};

export default GridContainer;
