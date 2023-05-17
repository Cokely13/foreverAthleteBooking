// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect, useState } from 'react'
// import {fetchSingleUser} from '../store/singleUserStore'
// import SessionsList from './SessionsList'



// export default function UpcomingSession() {
//   const dispatch = useDispatch()
//   const {id} = useSelector((state) => state.auth )
//   const { userId } = useParams();
//   const [statusView, setStatusView] = useState();
//   const [nextSession, setNextSession] = useState(null);

//   useEffect(() => {
//     dispatch(fetchSingleUser(id))

//     // Safe to add dispatch to the dependencies array
//   }, [])



//   const user = useSelector((state) => state.singleUser)


//   useEffect(() => {
//     if (user.sessions && user.sessions.length > 0) {
//       const currentDate = new Date();
//       const sessionsAfterCurrentDate = user.sessions.filter(session => new Date(session.start) > currentDate);
//       const sortedSessions = sessionsAfterCurrentDate.sort((a, b) => new Date(a.start) - new Date(b.start));

//       if (sortedSessions.length > 0) {
//         setNextSession(sortedSessions[0].start);
//       }
//     }
//   }, [user.sessions]);

//   console.log('nextSession', nextSession);


//   const handleCLick = (event) => {
//     event.preventDefault()
//     setStatusView(1)
//   }


//   console.log("user", user)


//   return (
//     <div>
//       <div>
//     <div className="text-center">
//       <h1>Next Session:</h1>
//     {user.sessions ? <div>{nextSession ? new Date(nextSession).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }) : ''}</div> : <div>check</div>}
//     </div>
//     </div>

//     </div>

// )}


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';

export default function UpcomingSession() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const [nextSession, setNextSession] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (user.sessions && user.sessions.length > 0) {
      const currentDate = new Date();
      const sessionsAfterCurrentDate = user.sessions.filter(
        (session) => new Date(session.start) > currentDate
      );
      const sortedSessions = sessionsAfterCurrentDate.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );

      if (sortedSessions.length > 0) {
        setNextSession(sortedSessions[0].start);
      }
    }
  }, [user.sessions]);

  useEffect(() => {
    if (nextSession) {
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const targetTime = new Date(nextSession);
        const timeDifference = targetTime.getTime() - currentTime.getTime();

        if (timeDifference > 0) {
          const seconds = Math.floor((timeDifference / 1000) % 60);
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown(null);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [nextSession]);

  console.log('nextSession', nextSession);
  console.log('countdown', countdown);

  return (
    <div>
      <div>
        <div className="text-center">
          <h1>Next Session:</h1>
          {user.sessions ? (
            <div>
              {nextSession ? (
                <>
                  <div>{new Date(nextSession).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</div>
                  {countdown && <div>Countdown: {countdown}</div>}
                </>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div>check</div>
          )}
        </div>
      </div>
    </div>
  );
}
