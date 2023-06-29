import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import Display from "./components/Display";
import { format } from "prettier";

const App = () => {
  //declare states using useState
  const [coordinates, setCoordinates] = useState({
    results: [
      {
        longitude: 0,
        latitude: 0,
      },
    ],
  });
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [endDateString, setEndDateString] = useState("");

  //get longitude and latitude from geolocation API
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
  //get weather data from coordinates and dates from historical weather API
  const getWeatherData = () => {
    fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.results[0].latitude}&longitude=${coordinates.results[0].longitude}&start_date=${startDateString}&end_date=${endDateString}&daily=temperature_2m_mean&timezone=GMT&temperature_unit=fahrenheit&min=2023-06-09&max=2023-06-23`
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

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    if (date === startDate) {
      setStartDateString(formattedDate);
    } else {
      setEndDateString(formattedDate);
    }

    return;
  };

  const handleClick = async () => {
    await formatDate(startDate);
    await formatDate(endDate);
    await searchLocation();
    getWeatherData();
  };


  {
    return (
      <div>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          // onKeyDown={handleKeyDown}
          placeholder="Select Location"
          onfocus="this.value=''"
        />
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(date)}
        />
        <button onClick={handleClick}>Click Me</button>
        <h2 className="location">This is the location: {location}</h2>
        <h2>This is the weather: {weather}</h2>
        <h2 className="location">This is the longitude: {coordinates.results[0].longitude}</h2>
        <h2 className="location">This is the latitude: {coordinates.results[0].latitude}</h2>
      </div>
    );
  }
};

export default App;
