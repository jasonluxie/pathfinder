import React from "react";
import { PiFlagPennantBold, PiFlagPennantFill } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

const Toolbar = () => {
  return (
    <div id="toolbar flex">
      <button id="start">
        <PiFlagPennantBold />
      </button>
      <button id="end">
        <PiFlagPennantFill />
      </button>
      <select>
        <option>A*</option>
        <option>Dijkstra</option>
      </select>
      <button>Start</button>
      <button id="reset">
        <GrPowerReset />
      </button>
    </div>
  );
};

export default Toolbar;
