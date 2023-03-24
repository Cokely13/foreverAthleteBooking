import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

const AddResult = () => {
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDurationChange = (value) => {
    setDuration(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event) {
      setErrorMessage('Please Select Event');
      return;
    }

    if (!date) {
      setErrorMessage('Please Select Date');
      return;
    }

    if (!duration) {
      setErrorMessage('Please Select Duration');
      return;
    }

    // Create a new result object with the input values
    const newResult = {
      event,
      date,
      duration
    };

    // TODO: Send the new result object to the server or add it to a store

    // Clear the input fields
    setEvent('');
    setDate('');
    setDuration('');
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="event">Event:</label>
        <select id="event" value={event} onChange={handleEventChange}>
          <option value="">-- Select Event --</option>
          <option value="Row">Row</option>
          <option value="SkiErg">SkiErg</option>
          <option value="AssaultBike">AssaultBike</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <TimePicker
          id="duration"
          disableClock
          clearIcon={null}
          format="mm:ss"
          value={duration}
          onChange={handleDurationChange}
        />
      </div>
      <button type="submit">Add Result</button>
    </form>
  );
};

export default AddResult;
