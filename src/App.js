import React from "react";
import "./styles.css";
import Game from "./components/Game";

export default function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Simple Memory Game</h1>
      <ul>
        <li>Below, build a 6 by 6 grid of tile objects</li>
        <li>
          For each tile, you can click on them and they will flip over (no
          animation needed), to reveal a number between 1 and 18
        </li>
        <li>
          When the page loads, initialize each tile to a number, and make sure
          there is always exactly one pair of numbers per game
        </li>
        <li>
          Build the game logic for a simple{" "}
          <a
            href="https://dkmgames.com/Memory/pairsrun.php"
            rel="noreferrer"
            target="_blank"
          >
            memory game
          </a>{" "}
          (users can select two tiles at a time, and if the selection is right,
          the tile stays face up)
        </li>
        <li>
          <strong>Bonus:</strong> Make the size of the grid easy to change, add
          flip over animations, and show pairs of icons instead of numbers
        </li>
      </ul>

      <Game />
    </div>
  );
}
