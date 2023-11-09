import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import C1_Graphical from './C1_Graphical'
import C2_Bisection from './C2_Bisection'
import C3_FalsePosition from './C3_FalsePosition'
import C4_OnePoint from "./C4_OnePoint"
import C5_NewtonRaphson from "./C5_NewtonRaphson"
import C6_Secant from "./C6_Secant"

function App() {
  const [selectedMethod, setSelectedMethod] = useState("graphical");

  return (
    <div className="App">
      <Router>
        <select className = "dropDown" value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
          <option value="graphical">Graphical Method</option>
          <option value="bisection">Bisection Method</option>
          <option value="falseposition">False Position</option>
          <option value="onepoint">One Point Iteration</option>
          <option value="newtonraphson">Newton-Raphson</option>
          <option value="secant">Secant Method</option>
        </select>
        
        <Routes>
          <Route path="/" element={getComponent(selectedMethod)}></Route>
        </Routes>
      </Router>
    </div>
  );
}

function getComponent(selectedMethod) {
  switch(selectedMethod) {
    case "graphical":
      return <C1_Graphical />
    case "bisection":
      return <C2_Bisection />
    case "falseposition":
      return <C3_FalsePosition />
    case "onepoint":
      return <C4_OnePoint />
    case "newtonraphson":
      return <C5_NewtonRaphson />
    case "secant":
      return <C6_Secant />
    default:
      return <C1_Graphical />
  }
}

export default App;