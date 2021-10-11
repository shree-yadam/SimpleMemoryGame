import React from "react";
import "./styles.css";
import Game from "./components/Game";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Simple Memory Game</h1>

      <Game />
    </div>
  );
}
