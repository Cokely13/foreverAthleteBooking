import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, } from 'react-router-dom'
import Select from 'react-select';
import { createSession, fetchSessions } from '../store/allSessionsStore';
import Modal from 'react-modal';
import {fetchSingleUser} from '../store/singleUserStore'
import { updateSingleSession } from '../store/singleSessionStore';
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
  const [showStatusModal, setShowStatusModal] = useState(false);
  const {id, admin} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser)
  const [sessionStatus, setSessionStatus] = useState("pending");
  const [sessionId, setSessionId] = useState(null);
  const dispatch = useDispatch()




  useEffect(() => {
    dispatch(fetchSingleUser(id))

    // Safe to add dispatch to the dependencies array
  }, [])


  const updatedSessions2 = Sessions2.map(session => {
    let color;
    switch (session.confirmed) {
      case 'pending':
        color = 'yellow';
        break;
      case 'confirmed':
        color = 'green';
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
      title: session.user.username,
      start: moment(session.start).toDate(),
      end: moment(session.end).toDate(),
      color: color
    };
  });

  useEffect(() => {
    dispatch(fetchSessions())
  }, [reload])

  const handleSelectEvent = (event) => {
    // Check if the logged in user is an admin
    if (!user.admin) {
      return;
    }

    // Search for a session with the same start and end time as the selected event
    const session = Sessions2.find((session) => {
      return moment(session.start).isSame(event.start) && moment(session.end).isSame(event.end);
    });

    // If a session is found, show the modal with the dropdown menu
    if (session) {
      // Set the default value of the dropdown to "pending"
      setSessionStatus("pending");
      setSessionDetails(session)
      setSessionId(session.id);
      setShowStatusModal(true);
    }
  };


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
      // userName: user.username
    });
    setSelectedSlot(event.start);
    setTimeOptions(hourOptions); // Update the dropdown menu options
    setShowModal(true); // Show the modal
  };


  // Form fields for specifying the session details
  const [sessionDetails, setSessionDetails] = useState();

  // Flag for showing/hiding the confirmation prompt
const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

// Options for the dropdown menu of starting times
const [timeOptions, setTimeOptions] = useState([]);



// Event handler for updating the newSession state with the selected start time
const handleTimeOptionChange = (event) => {
  setNewSession((prevState) => ({
    ...prevState,
    start: event.value,
    end: moment(event.value).add(1, 'hours').toDate()
  }));
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}



const handleSubmitStatus = async () => {
  try {
    // Update the confirmed property of the session based on the selected value

    sessionDetails.confirmed = sessionStatus
    await dispatch(updateSingleSession(sessionDetails));
    setShowStatusModal(false);
    setReload(!reload);
  } catch (err) {
    console.log(err);
  }
};


const handleSessionSubmit = (event) => {
  event.preventDefault();
  dispatch(
    createSession({
      ...newSession,
    })
  );
  alert(`Session requested for ${newSession.start.toLocaleString()}`);
  setSelectedSlot(null);
  setShowModal(false)
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

  const weekSessionsCount = updatedSessions2.filter((session) =>
  moment(session.start).isSame(moment(), 'week')
).length;



const pendingSessionCount = (updatedSessions2.filter((session) =>
moment(session.start).isSame(moment(), 'week')).filter((session) => session.confirmed == 'pending')).length

const deniedSessionCount = (updatedSessions2.filter((session) =>
moment(session.start).isSame(moment(), 'week')).filter((session) => session.confirmed == 'denied')).length

const confirmedSessionCount = (updatedSessions2.filter((session) =>
moment(session.start).isSame(moment(), 'week')).filter((session) => session.confirmed == 'confirmed')).length


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
        onSelectEvent={handleSelectEvent}
        className="my-4 p-3 border rounded"
      />
   {user.admin ? <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h3>Total Sessions This Week: {weekSessionsCount}</h3>
      <h3>Pending Sessions This Week: {pendingSessionCount}</h3>
      <h3>Confirmed Sessions This Week: {confirmedSessionCount}</h3>
      <h3>Denied Sessions This Week: {deniedSessionCount}</h3>
    </div> : <div>NOT AN ADMIN PAL! </div>}
      {user.admin && showStatusModal && (
        <Modal
          isOpen={showStatusModal}
          onRequestClose={() => setShowStatusModal(false)}
          contentLabel="Change session status"
          className="custom-modal"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change session status:</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowStatusModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <Select
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "denied", label: "Denied" },
                ]}
                defaultValue={{ value: sessionStatus, label: capitalize(sessionStatus) }}
                onChange={(option) => setSessionStatus(option.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSubmitStatus}>
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowStatusModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Confirm session request"
          className="custom-modal"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm session request:</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label">
                Starting time:
                <Select
                  options={timeOptions}
                  defaultValue={{ label: selectedSlot.toLocaleString(), value: selectedSlot }}
                  onChange={handleTimeOptionChange}
                />
              </label>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSessionSubmit}>
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
  }

  export default MyCalendar
