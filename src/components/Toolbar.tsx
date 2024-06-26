import React from "react";
import { PiFlagPennantBold, PiFlagPennantFill } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

interface PropTypes {
  setStartNode: VoidFunction;
  setEndNode: VoidFunction;
  setFlagType: VoidFunction;
}

const Toolbar: React.FC<PropTypes> = ({ setStartNode, setEndNode, setFlagType }) => {

  const setActiveTool = (event:React.MouseEvent<HTMLButtonElement>) => {

  }

  return (
    <div
      className="bg-muted-teal p-2 fixed bottom-1 justify-center"
      id="toolbar ">
      <button className="p-2" id="start" onClick={() => setFlagType("start")}>
        <PiFlagPennantBold />
      </button>
      <button className="p-2" id="end">
        <PiFlagPennantFill />
      </button>
      <select className="p-2">
        <option>A*</option>
        <option>Dijkstra</option>
      </select>
      <button className="p-2">Start</button>
      <button className="p-2" id="reset">
        <GrPowerReset />
      </button>
    </div>
  );
};

export default Toolbar;
