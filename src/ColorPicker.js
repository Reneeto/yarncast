const temps = [
  59.1, 63.5, 67.6, 62.1, 58.8, 58.8, 62.5, 61.9, 59.6, 59.76, 61.6, 100, 0,
];

import React, { useState, useEffect } from "react";

export default function ColorPicker() {
  const [colors, setColors] = useState([]);

  function matchColors(tempsArr) {
    const rangeValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const colorsArr = [];
    tempsArr.forEach((el) => {
      if (el < rangeValues[0]) {
        //navy
        colorsArr.push("#041c5f");
        // colorsArr[el] = "#041c5f";
      } else if (el < rangeValues[1]) {
        //colonial blue
        colorsArr.push("#3e64a8");
        // colorsArr[el] = "#3e64a8";
      } else if (el < rangeValues[2]) {
        //sky blue
        colorsArr.push("#72b1c4");
        // colorsArr[el] = "#72b1c4";
      } else if (el < rangeValues[3]) {
        //silver blue
        colorsArr.push("#cdd8de");
        // colorsArr[el] = "#cdd8de";
      } else if (el < rangeValues[4]) {
        //dusty blue
        colorsArr.push("#7192a4");
        // colorsArr[el] = "#7192a4";
      } else if (el < rangeValues[5]) {
        //peacock
        colorsArr.push("#046772");
        // colorsArr[el] = "#046772";
      } else if (el < rangeValues[6]) {
        //Olive
        colorsArr.push("#303723");
        // colorsArr[el] = "#303723";
      } else if (el < rangeValues[7]) {
        //dusty green
        colorsArr.push("#77784e");
        // colorsArr[el] = "#77784e";
      } else if (el < rangeValues[8]) {
        //mustard
        colorsArr.push("#d2ab4c");
        // colorsArr[el] = "#d2ab4c";
      } else if (el < rangeValues[9]) {
        //rust
        colorsArr.push("#a25a34");
        // colorsArr[el] = "#a25a34";
      } else if (el < rangeValues[10]) {
        //terracotta
        colorsArr.push("#c74722");
        // colorsArr[el] = "#c74722";
      } else {
        //cranberry
        colorsArr.push("#6f030f");
        // colorsArr[el] = "#6f030f";
      }
    });
    return setColors(colorsArr);
  }

  return (
    <div>
      <button onClick={() => matchColors(temps)}>Generate Colors</button>
      <div>
        {colors.map((color) => (
          <div style={{ backgroundColor: color }}>&nbsp;</div>
          // <g style={{backgroundColor: color}}>&nbsp;</g>
        ))}
      </div>
    </div>
  );
}
