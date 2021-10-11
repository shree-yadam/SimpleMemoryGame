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

  useEffect(() => {
    // Assigne values from 1 through 18 to 36 cells
    let countAssigned = [];
    for (let i = 0; i <= 18; i++) {
      countAssigned.push(0);
    }
    let tempItems = [];
    for (let i = 0; i < 36; i++) {
      tempItems.push({ value: 0, solved: false, clicked: false });
    }
    setItems(tempItems);

    for (let i = 0; i < 36; i++) {
      let isAssigned = false;
      while (!isAssigned) {
        const num = generateRandomNumber(1, 19);
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
    if (solvedCount === 18) {
      console.log("You WIN!!!");
    }
  }, [solvedCount]);

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
      {solvedCount === 18 && <div className="success-box">YOU WIN!!!</div>}
    </>
  );
}
