import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import Display from "./components/Display";

const App = () => {
  const [coordinates, setCoordinates] = useState({ results: [{}] });
  const [location, setLocation] = useState("");
  
  const searchLocation = () => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0].longitude);
        setCoordinates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  {
    return (
      <div>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Select Location"
        />
        <h2 className="location">{location}</h2>
        <h2 className="location">{coordinates.results[0].longitude}</h2>
        <h2 className="location">{coordinates.results[0].latitude}</h2>
      </div>
    );
  }
};

export default App;
