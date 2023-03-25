import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'
import {fetchSessions, } from '../store/allSessionsStore'
import { updateSingleSession } from "../store/singleSessionStore";

const sessionsData = [
  { start: new Date("2023-03-25T09:00:00"), end: new Date("2023-03-25T10:00:00"), userId: 1, confirmed: false },
  { start: new Date("2023-03-25T10:00:00"), end: new Date("2023-03-25T11:00:00"), userId: 2, confirmed: true },
  { start: new Date("2023-03-26T09:00:00"), end: new Date("2023-03-26T10:00:00"), userId: 1, confirmed: false },
  { start: new Date("2023-03-26T10:00:00"), end: new Date("2023-03-26T11:00:00"), userId: 2, confirmed: false },
];

const ConfirmSessions = () => {
  const dispatch = useDispatch()
  const Sessions = useSelector((state) => state.allSessions )
  console.log("sess", Sessions)
  const [sessions, setSessions] = useState(sessionsData.sort((a, b) => a.start - b.start));


  useEffect(() => {
    dispatch(fetchSessions())
    // Safe to add dispatch to the dependencies array
  }, [])

  const confirmSession = (event, session) => {
    // const updatedSessions = [...sessions];
    // updatedSessions[index].confirmed = true;
    // setSessions(updatedSessions);
    console.log("event", event)
    session.confirmed = "confirmed"
    dispatch(updateSingleSession(session))
  };

  return (
    <div>
      {Sessions.map((session, index) => (
        <div key={index}>
          <div>Start: {session.start}</div>
          <div>End: {session.end}</div>
          <div>User ID: {session.userId}</div>
          <div>Confirmed: {session.confirmed}</div>
         {session.confirmed == 'pending' ? <button onClick={event => confirmSession(event, session)}>
            Confirm
          </button> : <div></div>}
        </div>
      ))}
    </div>
  );
};

export default ConfirmSessions;
