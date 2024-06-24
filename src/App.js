import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../assets/yarncast-logo.png";
import placeholder from "../assets/placeholder-with-text.png";

const App = () => {
  let isDisabled = true;
  const displayImage = (
    <img src={placeholder} alt="placeholder image" className="image-fade-in" />
  );
  const Blanket = () => {
    return (
      <div className="blanket">
        {colors.map((color) => (
          <>
            {/* <g className="g-elements" x1="50" y1="0" x2="50" y2="300" style={{ backgroundColor: color }}>&nbsp;</g> */}

            <div className="row" style={{ backgroundColor: color }}>
              &nbsp;
            </div>
          </>
        ))}
      </div>
    );
  };
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
  const [displayChildren, setDisplayChildren] = useState([displayImage]);
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
    isDisabled = true;
  }, [endDate]);

  useEffect(() => {
    isDisabled = true;
    return;
  }, [location]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    matchColors(weather);
  }, [weather]);

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
      `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.results[0].latitude}&longitude=${coordinates.results[0].longitude}&start_date=${startDateString}&end_date=${endDateString}&daily=temperature_2m_max&timezone=GMT&temperature_unit=fahrenheit&min=2023-06-09&max=2023-06-23`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.daily.temperature_2m_max);
        setWeather(data.daily.temperature_2m_max);
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
        //0-
        colorsArr.push("#62767d");
        // colorsArr[el] = "#041c5f";
      } else if (el < rangeValues[1]) {
        //0-9
        colorsArr.push("#84928a");
        // colorsArr[el] = "#3e64a8";
      } else if (el < rangeValues[2]) {
        //10-19
        colorsArr.push("#858F7E");
        // colorsArr[el] = "#72b1c4";
      } else if (el < rangeValues[3]) {
        //20-29
        colorsArr.push("#868B72");
        // colorsArr[el] = "#cdd8de";
      } else if (el < rangeValues[4]) {
        //30-39
        colorsArr.push("#65684d");
        // colorsArr[el] = "#7192a4";
      } else if (el < rangeValues[5]) {
        //40-49
        colorsArr.push("#A9A38A");
        // colorsArr[el] = "#046772";
      } else if (el < rangeValues[6]) {
        //50-59
        colorsArr.push("#ecdec7");
        // colorsArr[el] = "#303723";
      } else if (el < rangeValues[7]) {
        //60-69
        colorsArr.push("#E2CEBB");
        // colorsArr[el] = "#77784e";
      } else if (el < rangeValues[8]) {
        //70-79
        colorsArr.push("#d8beaf");
        // colorsArr[el] = "#d2ab4c";
      } else if (el < rangeValues[9]) {
        //80-89
        colorsArr.push("#A58A82");
        // colorsArr[el] = "#a25a34";
      } else if (el < rangeValues[10]) {
        //90-99
        colorsArr.push("#725654");
        // colorsArr[el] = "#c74722";
      } else {
        //100+
        colorsArr.push("#513438");
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

  const handleClick = (event) => {
    setDisplayChildren(displayChildren.pop());
    setDisplayChildren(
      displayChildren.concat(<Blanket key={displayChildren.length} />)
    );
  };

  {
    return (
      <div className="container">
        <div className="header" id="header">
          <img src={logo} alt="yarncast-logo" className="image-fade-in" />
          <p>
            A website that helps crafters visualize their temperature blanket
            projects
            <br /> and make it easy to get the data they need to get crafting.
          </p>
        </div>
        <div id="filters">
          <p>Choose your temperature blanket location and date range.</p>
          <label>Search by city or ZIP code</label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            // onKeyDown={handleKeyDown}
            placeholder="Select Location"
            onfocus="this.value=''"
            onBlur={searchLocation}
            className="inputs"
          />
          <label>Enter Start Date</label>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
            onChange={(date) => setStartDate(date)}
            ref={startRef}
            onKeyDown={onKeyDown}
            className="inputs"
          />
          <label>Enter End Date</label>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
            className="inputs"
          />
          <div className="buttons">
            <button
              disabled={!location}
              onClick={() => handleClick()}
              className="inputs"
            >
              Generate Colors
            </button>
            {/* <button disabled={!location} className="inputs">
              Export to PDF
            </button> */}
          </div>
        </div>
        <div className="display" id="display">
          {displayChildren}
          {/* <h2>This is the location: {location}</h2>
          <h2>This is the start date: {`${startDate}`}</h2>
          <h2>This is the end date : {`${endDate}`}</h2>
          <h2>This is the start date string: {`${startDateString}`}</h2>
          <h2>This is the end date string: {`${endDateString}`}</h2>
          <h2>This is the longitude: {coordinates.results[0].longitude}</h2>
          <h2>This is the latitude: {coordinates.results[0].latitude}</h2>
          <h2>This is the weather: {weather}</h2> */}
        </div>
        <div className="footer" id="footer">
          <p>© 2023 yarncast</p>
        </div>
      </div>
    );
  }
};

export default App;
