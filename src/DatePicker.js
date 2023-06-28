import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker() {
  //declare states using useState
  const [startDate, setStartDate] = useState("startDate");
  const [endDate, setEndDate] = useState(new Date());

  //format date into yyyy-mm-dd
  // const formatDate = (date) => {
  //   const test = new Date(date);
  //   const formattedDate = test.toISOString().substring(0, 10);
  //   setStartDate(formattedDate);
  //   return;
  // };

  {
    return (
      <div>
        <h1>hello</h1>
        {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart // tells this DatePicker that it is part of a range*
          startDate={startDate}
        /> */}
        {/* <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(date)}
        /> */}
      </div>
    );
  }
}
