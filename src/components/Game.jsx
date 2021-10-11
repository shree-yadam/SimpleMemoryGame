import React, { useState, useEffect } from "react";
import "./game.css";
import Tile from "./Tile";

export default function Game() {
  const [items, setItems] = useState([]);
  const [clickTracker, setClickTracker] = useState({
    clickedItems: [-1, -1],
    clickCount: 0
  });
  const [solvedCount, setSolvedCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const MATRIX_SIDE = 4;
  const NUM_TILES = MATRIX_SIDE ** 2;
  const NUM_COUNT = NUM_TILES / 2;

  const generateRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const setClicked = (index) => {
    setClickTracker((prev) => {
      const tempTracker = { ...prev };
      tempTracker.clickedItems[tempTracker.clickCount] = index;
      tempTracker.clickCount++;
      return tempTracker;
    });
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index].clicked = true;
      return newItems;
    });
  };

  const initializeGame = () => {
    // Assigne values from 1 through 18 to 36 cells
    let countAssigned = [];
    for (let i = 0; i <= NUM_COUNT; i++) {
      countAssigned.push(0);
    }
    let tempItems = [];
    for (let i = 0; i < NUM_TILES; i++) {
      tempItems.push({ value: 0, solved: false, clicked: false });
    }
    setItems(tempItems);

    for (let i = 0; i < NUM_TILES; i++) {
      let isAssigned = false;
      while (!isAssigned) {
        const num = generateRandomNumber(1, NUM_COUNT + 1);
        if (countAssigned[num] < 2) {
          setItems((prev) => {
            const newItems = [...prev];
            newItems[i].value = num;
            return newItems;
          });
          countAssigned[num]++;
          isAssigned = true;
        }
      }
    }
    setSolvedCount(0);
    setDisabled(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (clickTracker.clickCount === 2) {
      if (
        items[clickTracker.clickedItems[0]].value ===
        items[clickTracker.clickedItems[1]].value
      ) {
        setItems((prev) => {
          const tempItems = [...prev];
          tempItems[clickTracker.clickedItems[0]].solved = true;
          tempItems[clickTracker.clickedItems[1]].solved = true;
          tempItems[clickTracker.clickedItems[0]].clicked = false;
          tempItems[clickTracker.clickedItems[1]].clicked = false;
          return tempItems;
        });
        setClickTracker({
          clickedItems: [],
          clickCount: 0
        });
        setSolvedCount((prev) => prev + 1);
      } else {
        setDisabled(true);
        setTimeout(() => {
          setItems((prev) => {
            const tempItems = [...prev];
            tempItems[clickTracker.clickedItems[0]].clicked = false;
            tempItems[clickTracker.clickedItems[1]].clicked = false;
            return tempItems;
          });
          setClickTracker({
            clickedItems: [],
            clickCount: 0
          });
          setDisabled(false);
        }, 500);
      }
    }
  }, [clickTracker, items]);

  useEffect(() => {
    if (solvedCount === NUM_COUNT) {
      console.log("You WIN!!!");
    }
  }, [solvedCount]);

  const handleReset = (event) => {
    initializeGame();
  };

  return (
    <>
      <div className="container">
        {items &&
          items.map((item, index) => (
            <Tile
              key={index}
              value={item.value}
              clicked={item.clicked}
              solved={item.solved}
              index={index}
              setClicked={setClicked}
              disabled={disabled}
            />
          ))}
      </div>
      {solvedCount === NUM_COUNT && (
        <>
          <div className="success-box">
            YOU WIN!!!
            <button onClick={handleReset}>RESET</button>
          </div>
        </>
      )}
    </>
  );
}
