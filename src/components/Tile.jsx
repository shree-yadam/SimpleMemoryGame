import React from "react";
import "./tile.css";

export default function Tile({
  value,
  clicked,
  solved,
  index,
  setClicked,
  disabled
}) {
  return (
    <button
      className={solved ? "item item__success" : "item"}
      onClick={() => {
        setClicked(index);
      }}
      disabled={disabled}
    >
      {(solved || clicked) && value}
    </button>
  );
}
