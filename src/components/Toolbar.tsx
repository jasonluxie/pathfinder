import React from "react";
import { PiFlagPennantBold, PiFlagPennantFill } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

const Toolbar = () => {
  const test = () => {
    console.log("test")
  }
  return (
    <div className="bg-muted-teal p-2 fixed bottom-1 justify-center"id="toolbar ">
      <button className='p-2' id="start" onClick={test}>
        <PiFlagPennantBold />
      </button>
      <button className='p-2' id="end">
        <PiFlagPennantFill />
      </button>
      <select className='p-2'>
        <option>A*</option>
        <option>Dijkstra</option>
      </select>
      <button className='p-2'>Start</button>
      <button className='p-2'id="reset">
        <GrPowerReset />
      </button>
    </div>
  );
};

export default Toolbar;
