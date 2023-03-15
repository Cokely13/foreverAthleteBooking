import React, { useState } from 'react';

const Calendar = () => {
  const [bookings, setBookings] = useState([]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isBooked = (hour) => bookings.includes(hour);

  const handleBooking = (hour) => {
    if (!isBooked(hour)) {
      setBookings([...bookings, hour]);
    }
  };

  const renderHour = (hour) => {
    const booked = isBooked(hour);
    return (
      <div key={hour} className={`hour ${booked ? 'booked' : ''}`} onClick={() => handleBooking(hour)}>
        {hour}:00 - {hour + 1}:00 {booked ? '(booked)' : ''}
      </div>
    );
  };

  return (
    <div>
      <h2>Calendar</h2>
      <div className="calendar">{hours.map(renderHour)}</div>
    </div>
  );
};

export default Calendar;
