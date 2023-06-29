const temps = [
  59.1, 63.5, 67.6, 62.1, 58.8, 58.8, 62.5, 61.9, 59.6, 59.76, 61.6, 63.1, 62.6,
];

import React, { useState } from "react";

export default function ColorPicker() {
  //setState and initialize as object
  const [colors, setColors] = useState({});

  
  function matchColors(tempsArr) {
    const rangeValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const colorsObj = {};

    tempsArr.forEach(el) {
      if (el < rangeValues[0]) {
        //navy
        colorsObj[el] = '#1f2942';
      }else if (el < rangeValues[1]) {
        //colonial blue
        colorsObj[el] = '#388eba';
      }else if (el < rangeValues[2]) {
        colorsObj[el] = '#75c8a5';
      }else if (el < rangeValues[3]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[4]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[5]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[6]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[7]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[8]) {
        return 'Mustard'
        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[9]) {

        colorsObj[el] = 'Navy';
      }else if (el < rangeValues[10]) {

        colorsObj[el] = 'Navy';
      }else {

        colorsObj[el] = 'Navy';
      }
    }
  }

  return (
    <div>
    </div>
  );
}
