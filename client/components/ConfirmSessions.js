// import React, { useState } from "react";
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect} from 'react'
// import {fetchSessions, } from '../store/allSessionsStore'
// import { updateSingleSession } from "../store/singleSessionStore";

// const ConfirmSessions = () => {
//   const dispatch = useDispatch()
//   const Sessions = useSelector((state) => state.allSessions )

//   useEffect(() => {
//     dispatch(fetchSessions())
//   }, [])

//   const confirmSession = (event, session) => {
//     session.confirmed = "confirmed"
//     dispatch(updateSingleSession(session))
//   };

//   useEffect(() => {
//     dispatch(fetchSessions())
//   }, [Sessions])

//   const sortedSessions = Sessions.sort((a, b) => new Date(a.start) - new Date(b.start))

//   return (
//     <div>
//       {Sessions.map((session, index) => (
//         <div key={index}>
//           <div>Start: {session.start}</div>
//           <div>End: {session.end}</div>
//           <div>User ID: {session.userId}</div>
//           <div>Confirmed: {session.confirmed}</div>
//          {session.confirmed === 'pending' ? <button onClick={event => confirmSession(event, session)}>
//             Confirm
//           </button> : <div></div>}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ConfirmSessions;

import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {fetchSessions, } from '../store/allSessionsStore'
import { updateSingleSession } from "../store/singleSessionStore";

const ConfirmSessions = ({ numConfirmations, setNumConfirmations }) => {
  const dispatch = useDispatch()
  const Sessions = useSelector((state) => state.allSessions )

  useEffect(() => {
    dispatch(fetchSessions())
  }, [numConfirmations])

  const confirmSession = (event, session) => {
    session.confirmed = "confirmed"
    dispatch(updateSingleSession(session))
    setNumConfirmations(numConfirmations + 1);
  };

  const denySession = (event, session) => {
    session.confirmed = "denied"
    dispatch(updateSingleSession(session))
    setNumConfirmations(numConfirmations + 1);
  };

  const sortedSessions = Sessions.sort((a, b) => new Date(a.start) - new Date(b.start))

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  return (
    <div>
      <h1><u>Confirm Sessions</u></h1>
      {sortedSessions.filter((session) => session.confirmed == 'pending' ).map((session, index) => (
        <div key={index}>
          <div>Start: {formatDate(session.start)}</div>
          <div>End: {formatDate(session.end)}</div>
          <div>User ID: {session.userId}</div>
          <div>Confirmed: {session.confirmed}</div>
         {session.confirmed === 'pending' ?<div> <button onClick={event => confirmSession(event, session)}>
            Confirm
          </button>
          <button onClick={event => denySession(event, session)}>
          Deny
        </button> </div> : <div></div>}
        </div>
      ))}
    </div>
  );
};

export default ConfirmSessions;
