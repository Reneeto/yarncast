import React from "react";

export default function Filters() {
  return (
    <div className="filters">
      <label for="location">Location:</label>
      <input id="location" type="text" />
      <label>Start Date:</label>
      <label>End Date:</label>
      <label for="color-palette-dropdown">Select Color Palette:</label>
      <select name="" id="color-palette-dropdown">
        <option>Theme 1</option>
        <option>Theme 2</option>
        <option>Theme 3</option>
      </select>
      <button type="button">Start Over</button>
      <button type="button">Generate</button>
      {/* <button type="button">Export to PDF</button> */}
    </div>
  );
}
