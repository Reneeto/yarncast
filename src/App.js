import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import Display from "./components/Display";

const App = () => {
  const [coordinates, setCoordinates] = useState({
    results: [
      {
        longitude: 0,
        latitude: 0,
      },
    ],
  });
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState({
    startDate: "2023-06-01",
    endDate: "2023-06-02",
  });
  const [weather, setWeather] = useState([]);

  const searchLocation = () => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoordinates(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log();
  const getWeatherData = () => {
    fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.results[0].latitude}&longitude=${coordinates.results[0].longitude}&start_date=${dates.startDate}&end_date=${dates.endDate}&daily=temperature_2m_mean&timezone=GMT&temperature_unit=fahrenheit&min=2023-06-09&max=2023-06-23`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.daily.temperature_2m_mean);
        setWeather(data.daily.temperature_2m_mean);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await searchLocation();
      getWeatherData();
    }
  };

  {
    return (
      <div>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          // onKeyDown={searchLocation}
          onKeyDown={handleKeyDown}
          placeholder="Select Location"
          onfocus="this.value=''"
        />
        <h2 className="location">{location}</h2>
        <h2>{weather}</h2>
        <h2 className="location">{coordinates.results[0].longitude}</h2>
        <h2 className="location">{coordinates.results[0].latitude}</h2>
      </div>
    );
  }
};

export default App;
