import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [endDateString, setEndDateString] = useState("");

  // format date into yyyy-mm-dd
  const formatDate = (date) => {

    const formattedDate = new Date(date).toISOString().substring(0, 10);
    if (date === startDate) {
      setStartDateString(formattedDate);
    } else {
      setEndDateString(formattedDate);
    }

    return;
  };

  const handleClick = () => {
    formatDate(startDate);
    formatDate(endDate);
  };

  return (
    <div>
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
    </div>
  );
}
