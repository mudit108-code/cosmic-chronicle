import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (value) => {
    setDate(value);
    onDateChange(value);
  };

  return (
    <div className="calendar-section">
      <h2>🔭 Choose a Date</h2>
      <Calendar onChange={handleChange} value={date} />
    </div>
  );
};

export default DatePicker;