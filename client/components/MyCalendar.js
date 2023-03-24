import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, } from 'react-router-dom'
import { createSession, fetchSessions } from '../store/allSessionsStore';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const sessions = [
  {
    start: new Date(2023, 2, 27, 5, 30),
    end: new Date(2023, 2, 27, 6, 30),
    title: 'Available'
  },
  {
    start: new Date(2023, 2, 28, 5, 30),
    end: new Date(2023, 2, 28, 6, 30),
    title: 'Available'
  },
  // Add more available sessions here
];

const MyCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newSession, setNewSession] = useState(null);
  const Sessions2 = useSelector((state) => state.allSessions )
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()

  console.log("sessions", Sessions2)
  // console.log("date", new Date(2023, 2, 27, 5, 30))

  const updatedSessions2 = Sessions2.map(session => {
    return {
      ...session,
      start: moment(session.start).toDate(),
      end: moment(session.end).toDate(),
      title: session.userId
    };
  });

  useEffect(() => {
    dispatch(fetchSessions())
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleSelectSlot = (event) => {
    setNewSession({
      start: event.start,
      end: event.end,
      userId: id
    })
    setSelectedSlot(event.start);
  };

  const handleConfirmSession = () => {
    // TODO: Create new session in Sequelize Session model using selectedSlot
    // const newSession = {
    //   start: event.start,
    //   end: event.end,
    //   userId: id
    // }
   console.log("new", newSession)
    dispatch(createSession(newSession))
    alert(`Session requested for ${selectedSlot}`);
    setSelectedSlot(null);
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={updatedSessions2}
        defaultView="week"
        views={['week']}
        min={new Date(2023, 2, 27, 5, 30)}
        max={new Date(2023, 3, 2, 19)}
        step={60}
        timeslots={1}
        onSelectSlot={handleSelectSlot}
      />
      {selectedSlot && (
        <div>
          <p>Confirm session request for {selectedSlot.toLocaleString()}?</p>
          <button onClick={handleConfirmSession}>Confirm</button>
          <button onClick={() => setSelectedSlot(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
