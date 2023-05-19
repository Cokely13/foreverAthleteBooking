import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimePicker from 'react-time-picker';
import { createResult } from '../store/allResultsStore';

const AddResult = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
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

    if (!minutes && !seconds) {
      setErrorMessage('Please Select Duration');
      return;
    }

    // Create a new result object with the input values
    const newResult = {
      userId: id,
      event,
      date,
      duration: `${minutes}:${seconds}`,
    };

    dispatch(createResult(newResult));

    // Set the success message and clear the input fields
    setSuccessMessage('Result added successfully!');
    setEvent('');
    setDate('');
    setMinutes('');
    setSeconds('');
    setErrorMessage('');
  };

  return (
    <div style={{ backgroundColor: 'white', margin: '100px 50px 50px', textAlign: 'center', padding: '20px', border: '1px solid black', borderRadius: "10px",  }}>
      <h1>Add Result</h1>
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <div>
        <label htmlFor="event" style={{ marginRight: "10px" }}>Event:</label>
        <select id="event" value={event} onChange={handleEventChange}>
          <option value=""> -- Select Event --</option>
          <option value="Row">Row</option>
          <option value="SkiErg">SkiErg</option>
          <option value="AssaultBike">AssaultBike</option>
        </select>
      </div>
      <div>
        <label htmlFor="date" style={{ marginRight: "10px" }}>Date:  </label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="minutes" style={{ marginRight: "10px" }}>Duration:  </label>
        <input
          type="number"
          id="minutes"
          min="0"
          max="59"
          value={minutes}
          onChange={handleMinutesChange}
          style={{ marginRight: '5px' }}
        />
        :
        <input
          type="number"
          id="seconds"
          min="0"
          max="59"
          value={seconds}
          onChange={handleSecondsChange}
          style={{ marginLeft: '5px' }}
        />
      </div>
      <button type="submit">Add Result</button>
    </form>
    </div>
  );
};

export default AddResult;
