import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, } from 'react-router-dom'
import Select from 'react-select';
import { createSession, fetchSessions } from '../store/allSessionsStore';
import Modal from 'react-modal';
import ConfirmSessions from './ConfirmSessions';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newSession, setNewSession] = useState(null);
  const [reload, setReload] = useState(false);
  const [numConfirmations, setNumConfirmations] = useState(0);
  const Sessions2 = useSelector((state) => state.allSessions )
  const [showModal, setShowModal] = useState(false);
  const {id} = useSelector((state) => state.auth )
  const dispatch = useDispatch()


  const updatedSessions2 = Sessions2.map(session => {
    let color;
    switch (session.confirmed) {
      case 'pending':
        color = 'yellow';
        break;
      case 'confirmed':
        color = 'blue';
        break;
      case 'denied':
        color = 'red';
        break;
      default:
        color = 'gray';
        break;
    }

    return {
      ...session,
      start: moment(session.start).toDate(),
      end: moment(session.end).toDate(),
      title: session.userId,
      color: color
    };
  });

  useEffect(() => {
    dispatch(fetchSessions())
  }, [reload])


  const handleSelectSlot = (event) => {
    // Construct an array of time options for the dropdown menu
    const hourOptions = [];
    const startTime = moment(event.start)
      .startOf('day')
      .add(5, 'hours'); // Start time is set to 5:00 AM
    const endTime = moment(event.start)
      .endOf('day')
      .subtract(1, 'hours'); // End time is set to 11:00 PM
    const timeInterval = 30; // Time interval is set to 30 minutes

    while (startTime < endTime) {
      hourOptions.push({
        label: startTime.format('h:mm A'),
        value: startTime.toDate(),
      });
      startTime.add(timeInterval, 'minutes');
    }

    // Update the newSession state with the selected start time
    setNewSession({
      start: event.start,
      end: event.end,
      userId: id,
    });
    setSelectedSlot(event.start);
    setTimeOptions(hourOptions); // Update the dropdown menu options
    setShowModal(true); // Show the modal
  };

  const handleConfirmSession = () => {
    dispatch(createSession(newSession));
    alert(`Session requested for ${newSession.start.toLocaleString()}`);
    setSelectedSlot(null);
    setReload(!reload);
    setShowConfirmationPrompt(false); // Hide the confirmation prompt
  };

  // Form fields for specifying the session details
  const [sessionDetails, setSessionDetails] = useState({
    title: "",
    description: "",
    location: "",
    guests: "",
  });

  // Flag for showing/hiding the confirmation prompt
const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

// Options for the dropdown menu of starting times
const [timeOptions, setTimeOptions] = useState([]);

// Event handler for updating the session details form fields
const handleSessionDetailsChange = (event) => {
  const { name, value } = event.target;
  setSessionDetails((prevState) => ({ ...prevState, [name]: value }));
};

// Event handler for updating the newSession state with the selected start time
const handleTimeOptionChange = (event) => {
  setNewSession((prevState) => ({ ...prevState, start: event.value }));
};

const handleSessionSubmit = (event) => {
  event.preventDefault();
  const { title, description, location, guests } = sessionDetails;
  dispatch(
    createSession({
      ...newSession,
      title,
      description,
      location,
      guests,
    })
  );
  alert(`Session requested for ${newSession.start.toLocaleString()}`);
  setSelectedSlot(null);
  setReload(!reload);
  setShowConfirmationPrompt(false);
};


  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      width: '100%',
      height: '100%',
      textAlign: 'left',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontSize: '14px',
      fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
      cursor: 'pointer'
    };
    return {
      style: style
    };
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={updatedSessions2}
        defaultView="week"
        views={["week"]}
        min={new Date(2023, 2, 27, 5, 30)}
        max={new Date(2023, 3, 2, 19)}
        step={60}
        timeslots={1}
        eventPropGetter={eventStyleGetter}
        onSelectSlot={handleSelectSlot}
      />
      {showModal && (
        <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Confirm session request"
      >
        <div>
          <p>Confirm session request:</p>
          <label>
            Starting time:
            <Select
              options={timeOptions}
              defaultValue={{ label: selectedSlot.toLocaleString(), value: selectedSlot }}
              onChange={handleTimeOptionChange}
            />
          </label>
          <form onSubmit={handleSessionSubmit}>
            <label>
              Title:
              <input type="text" name="title" onChange={handleSessionDetailsChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" onChange={handleSessionDetailsChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" onChange={handleSessionDetailsChange} />
            </label>
            <label>
              Guests:
              <input type="text" name="guests" onChange={handleSessionDetailsChange} />
            </label>
            <button type="submit">Confirm</button>
          </form>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
)}
</div>
);
  }

  export default MyCalendar
