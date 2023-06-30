import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [weather, setWeather] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [endDateString, setEndDateString] = useState("");
  const [colors, setColors] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    formatDate(startDate);
    formatDate(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    getWeatherData(weather);
  }, [endDate]);

  //FIRST: get longitude and latitude from geolocation API
  const searchLocation = () => {
    console.log("getting lon and lat");
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

  //SECOND: format start and end dates for API call
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    if (date === startDate) {
      setStartDateString(formattedDate);
    } else {
      setEndDateString(formattedDate);
    }

    return;
  };

  //THIRD: get weather data from coordinates and dates from historical weather API
  const getWeatherData = () => {
    console.log("getting weather data");
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

  //FOURTH: match temps to color formulas
  function matchColors(tempsArr) {
    console.log("matching colors");
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
  //startRef and onKeyDown lets you tab from the startDate to endDate date picker
  const startRef = useRef();

  const onKeyDown = (e) => {
    if (e.keyCode === 9 || e.which === 9) {
      startRef.current.setOpen(false);
    }
  };

  {
    return (
      <div>
        <div className="header">
          <img src="/assets/yarncast-logo.png" />
        </div>
        <div className="site-info">
          <p>
            Yarncast: a website that helps crafters visualize their temperature
            blanket projects and make it easy to get the data they need to get
            crafting.
          </p>
        </div>
        <div className="filters">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            // onKeyDown={handleKeyDown}
            placeholder="Select Location"
            onfocus="this.value=''"
            onBlur={searchLocation}
            className="location"
          />
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
            onChange={(date) => setStartDate(date)}
            ref={startRef}
            onKeyDown={onKeyDown}
            className="start-date"
          />
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
            className="end-date"
          />
          <button onClick={() => matchColors(weather)}>Generate Colors</button>
        </div>
        <div className="display">
          <div>
            {colors.map((color) => (
              <>
                {/* <g style={{backgroundColor: color}}>&nbsp;</g> */}
                <div style={{ backgroundColor: color }}>&nbsp;</div>
              </>
            ))}
          </div>
          <img src="/assets/placeholder-with-text.png" />
          <button onClick={() => matchColors(weather)}>Generate Colors</button>
        </div>
        <div className="footer">
          <p>© 2023 yarncast</p>
        </div>
        {/* <h2>This is the location: {location}</h2>
        <h2>This is the start date: {`${startDate}`}</h2>
        <h2>This is the end date : {`${endDate}`}</h2>
        <h2>This is the start date string: {`${startDateString}`}</h2>
        <h2>This is the end date string: {`${endDateString}`}</h2>
        <h2>This is the longitude: {coordinates.results[0].longitude}</h2>
        <h2>This is the latitude: {coordinates.results[0].latitude}</h2>
        <h2>This is the weather: {weather}</h2> */}
        <div></div>
      </div>
    );
  }
};

export default App;
