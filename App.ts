import { useState } from 'react';
import './App.css';
import Grid from './Grid';
import QuadSum from './Quadsum';
import Sum from './Sum';
import { checkSolution, getSolution } from "./Solver";

function App() {
  const [grid, setGrid] = useState<any|number>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  
  const [quad, setQuad] = useState<any|number>([
    ["", ""],
    ["", ""],
  ]);
  
  const [colors, setColors] = useState<any>([
    ["#000000", "#000000", "#000000"],
    ["#000000", "#000000", "#000000"],
    ["#000000", "#000000", "#000000"],
  ]);
  
  const [yellowSum, setYellowSum] = useState();
  const [orangeSum, setOrangeSum] = useState();
  const [greenSum, setGreenSum] = useState();
  const [selectedColor, setSelectedColor] = useState(null);

  const colorSum = {
    "#ffea00": yellowSum,
    "#ff9100": orangeSum,
    "#88c97d": greenSum,
  };

  const handleChange = (row, col, value) => {
    const newGrid:any|number = [...grid];
    newGrid[row][col] = value === "" ? "" : parseInt(value);
    setGrid(newGrid);
  };

  const handleQuadChange = (row, col, value) => {
    const newQuad:any|number = [...quad];
    newQuad[row][col] = value === "" ? "" : parseInt(value);
    setQuad(newQuad);
  };

  const handleSumChange = (color, value) => {
    const newValue:any|number = value === "" ? "" : parseInt(value);
    if (color === "#ff9100") {
      setOrangeSum(newValue);
    } else if (color === "#ffea00") {
      setYellowSum(newValue);
    } else if (color === "#88c97d") {
      setGreenSum(newValue);
    }
  };

  const handleColorSumClick = (color) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (row, col) => {
    if (selectedColor) {
      const newColors = [...colors];
      newColors[row][col] = selectedColor;
      setColors(newColors);
      setSelectedColor(null);
    }
  };

  const handleClick = () => {
    const check = checkSolution(grid, colors, quad, colorSum);
    if (check) {
      alert("Correct!");
    } else {
      alert("Incorrect.");
    }
  };

  const handleSolve = () => {
    const solution = getSolution(colors, quad, colorSum);
    if (solution) {
      setGrid(solution);
    } else {
      alert("No solution!");
    }
  };
  
  const handleClear = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };
  
  function handleReset() {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="grid-container">
        <Grid
          grid={grid}
          colors={colors}
          onChange={handleChange}
          onClick={handleSquareClick}
        ></Grid>
        <QuadSum
          className="nw"
          onChange={handleQuadChange}
          quads={quad}
          coords={[0, 0]}
        />
        <QuadSum
          className="ne"
          onChange={handleQuadChange}
          quads={quad}
          coords={[1, 0]}
        />
        <QuadSum
          className="se"
          onChange={handleQuadChange}
          quads={quad}
          coords={[0, 1]}
        />
        <QuadSum
          className="sw"
          onChange={handleQuadChange}
          quads={quad}
          coords={[1, 1]}
        />
      </div>
      <div className="sum-container">
        <Sum
          color="#ffea00"
          initialValue={yellowSum}
          onChange={handleSumChange}
          onClick={handleColorSumClick}
        />
        <Sum
          color="#ff9100"
          initialValue={orangeSum}
          onChange={handleSumChange}
          onClick={handleColorSumClick}
        />
        <Sum
          color="#88c97d"
          initialValue={greenSum}
          onChange={handleSumChange}
          onClick={handleColorSumClick}
        />
      </div>
      <div>
        <button onClick={handleClick}>Check🧮️</button>
        <button onClick={handleClear}>Clear🧹️</button>
        <button onClick={handleSolve}>Solve🤖</button>
        <button onClick={handleReset}>Reset💻</button>
      </div>
    </div>
  );
}

export default App;
