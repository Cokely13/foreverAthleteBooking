import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Enter the event title');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleEventClick = (event) => {
    const confirmDelete = window.confirm(`Do you want to delete "${event.title}"?`);
    if (confirmDelete) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
        step={60}
        timeslots={1}
      />
    </div>
  );
};

export default BookingCalendar;
