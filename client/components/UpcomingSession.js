import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchSingleUser} from '../store/singleUserStore'
import SessionsList from './SessionsList'



export default function UpcomingSession() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { userId } = useParams();
  const [statusView, setStatusView] = useState();
  const [nextSession, setNextSession] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleUser(id))

    // Safe to add dispatch to the dependencies array
  }, [])



  const user = useSelector((state) => state.singleUser)


  useEffect(() => {
    if (user.sessions && user.sessions.length > 0) {
      const currentDate = new Date();
      const sessionsAfterCurrentDate = user.sessions.filter(session => new Date(session.start) > currentDate);
      const sortedSessions = sessionsAfterCurrentDate.sort((a, b) => new Date(a.start) - new Date(b.start));

      if (sortedSessions.length > 0) {
        setNextSession(sortedSessions[0].start);
      }
    }
  }, [user.sessions]);

  console.log('nextSession', nextSession);


  const handleCLick = (event) => {
    event.preventDefault()
    setStatusView(1)
  }


  console.log("user", user)


  return (
    <div>
      <div>
    <div className="text-center">
      <h1>Next Session:</h1>
    {user.sessions ? <div>{nextSession ? new Date(nextSession).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }) : ''}</div> : <div>check</div>}
    </div>
    </div>

    </div>

)}
