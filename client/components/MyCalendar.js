// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { useSelector, useDispatch } from 'react-redux'
// import { Link, useParams, } from 'react-router-dom'
// import { createSession, fetchSessions } from '../store/allSessionsStore';

// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [newSession, setNewSession] = useState(null);
//   const Sessions2 = useSelector((state) => state.allSessions )
//   const {id} = useSelector((state) => state.auth )
//   const dispatch = useDispatch()

//   console.log("sessions", Sessions2)
//   // console.log("date", new Date(2023, 2, 27, 5, 30))

//   const updatedSessions2 = Sessions2.map(session => {
//     let color;
//     switch (session.confirmed) {
//       case 'pending':
//         color = 'yellow';
//         break;
//       case 'confirmed':
//         color = 'blue';
//         break;
//       case 'denied':
//         color = 'red';
//         break;
//       default:
//         color = 'gray';
//         break;
//     }

//     return {
//       ...session,
//       start: moment(session.start).toDate(),
//       end: moment(session.end).toDate(),
//       title: session.userId,
//       color: color
//     };
//   });

//   useEffect(() => {
//     dispatch(fetchSessions())
//     // Safe to add dispatch to the dependencies array
//   }, [])

//   const handleSelectSlot = (event) => {
//     setNewSession({
//       start: event.start,
//       end: event.end,
//       userId: id
//     })
//     setSelectedSlot(event.start);
//   };

//   const handleConfirmSession = () => {
//     // TODO: Create new session in Sequelize Session model using selectedSlot
//     // const newSession = {
//     //   start: event.start,
//     //   end: event.end,
//     //   userId: id
//     // }
//    console.log("new", newSession)
//     dispatch(createSession(newSession))
//     alert(`Session requested for ${selectedSlot}`);
//     setSelectedSlot(null);
//   };

//   const eventStyleGetter = (event, start, end, isSelected) => {
//     const backgroundColor = event.color;
//     const style = {
//       backgroundColor: backgroundColor,
//       borderRadius: '5px',
//       opacity: 0.8,
//       color: 'black',
//       border: '0px',
//       display: 'block',
//       width: '100%',
//       height: '100%',
//       textAlign: 'left',
//       paddingLeft: '10px',
//       paddingRight: '10px',
//       paddingTop: '2px',
//       paddingBottom: '2px',
//       fontSize: '14px',
//       fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
//       cursor: 'pointer'
//     };
//     return {
//       style: style
//     };
//   };

//   return (
//     <div>
//       <Calendar
//         selectable
//         localizer={localizer}
//         events={updatedSessions2}
//         defaultView="week"
//         views={['week']}
//         min={new Date(2023, 2, 27, 5, 30)}
//         max={new Date(2023, 3, 2, 19)}
//         step={60}
//         timeslots={1}
//         eventPropGetter={eventStyleGetter}
//         onSelectSlot={handleSelectSlot}
//       />
//       {selectedSlot && (
//         <div>
//           <p>Confirm session request for {selectedSlot.toLocaleString()}?</p>
//           <button onClick={handleConfirmSession}>Confirm</button>
//           <button onClick={() => setSelectedSlot(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, } from 'react-router-dom'
import { createSession, fetchSessions, updateSession } from '../store/allSessionsStore';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newSession, setNewSession] = useState(null);
  const Sessions2 = useSelector((state) => state.allSessions )
  const {id, isAdmin} = useSelector((state) => state.auth )
  const dispatch = useDispatch()

  console.log("sessions", Sessions2)
  // console.log("date", new Date(2023, 2, 27, 5, 30))

  const updatedSessions2 = Sessions2.map(session => {
    let color;
    switch (session.confirmed) {
      case 'pending':
        color = 'yellow';
        if (id == 3) {
          session.button = (
            <button onClick={() => handleConfirmSession(session)}>
              Confirm session
            </button>
          );
        }
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

  const handleConfirmSession = (session) => {
    const updatedSession = {
      ...session,
      confirmed: 'confirmed'
    };
    dispatch(updateSession(updatedSession));
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

  const eventContent = (event) => {
    return (
      <div>
        <span>{event.title}</span>
        {event.button}
      </div>
    );
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
        eventPropGetter={eventStyleGetter}
        eventContent={eventContent}
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
}

export default MyCalendar;
