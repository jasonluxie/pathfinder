import React from "react";
import { PiFlagPennantBold, PiFlagPennantFill } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { Algorithm } from "../types/types";

interface ToolbarProps {
  activeTool: "start" | "end" | "wall";
  setActiveTool: (tool: "start" | "end" | "wall") => void;
  algorithm: Algorithm;
  setAlgorithm: (algorithm: Algorithm) => void;
  startPathfinding: () => void;
  clearGrid: () => void;
  isVisualizing: boolean;
  visualizationSpeed: number;
  setVisualizationSpeed: (speed: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setActiveTool,
  algorithm,
  setAlgorithm,
  startPathfinding,
  clearGrid,
  isVisualizing,
  visualizationSpeed,
  setVisualizationSpeed,
}) => {
  return (
    <div
      className="bg-muted-teal p-2 fixed bottom-1 justify-center flex items-center gap-4"
      id="toolbar"
    >
      <button
        disabled={isVisualizing}
        className={`p-2 ${
          activeTool === "start" ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={() => setActiveTool("start")}
      >
        <PiFlagPennantBold />
      </button>
      <button
        disabled={isVisualizing}
        className={`p-2 ${
          activeTool === "end" ? "bg-red-500" : "bg-gray-300"
        }`}
        onClick={() => setActiveTool("end")}
      >
        <PiFlagPennantFill />
      </button>
      <button
        disabled={isVisualizing}
        className={`p-2 ${
          activeTool === "wall" ? "bg-gray-800 text-white" : "bg-gray-300"
        }`}
        onClick={() => setActiveTool("wall")}
      >
        Wall
      </button>
      <select
        disabled={isVisualizing}
        className="p-2"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
      </select>
      <div className="flex items-center gap-2">
        <label htmlFor="speed" className="text-white">
          Speed
        </label>
        <input
          disabled={isVisualizing}
          id="speed"
          type="range"
          min="10"
          max="100"
          step="10"
          value={visualizationSpeed}
          onChange={(e) => setVisualizationSpeed(Number(e.target.value))}
        />
      </div>
      <button
        disabled={isVisualizing}
        className="p-2 bg-blue-500 text-white"
        onClick={startPathfinding}
      >
        Start
      </button>
      <button
        disabled={isVisualizing}
        className="p-2"
        id="reset"
        onClick={clearGrid}
      >
        <GrPowerReset />
      </button>
    </div>
  );
};

export default Toolbar;
