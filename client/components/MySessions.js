import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';
import moment from 'moment';
// import SessionsLineGraph from './SessionsLineGraph';
import SessionsLineGraph from './SessionsLineGraph'

function MySessions() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);


  const calculateSessionsPerWeek = () => {
    if (user.sessions) {
      const sessionsPerWeek = {
        twoWeeksAgo: 0,
        lastWeek: 0,
        currentWeek: 0,
        nextWeek: 0,
      };

      const currentDate = moment().startOf('isoWeek');
      const nextWeek = moment().add(1, 'week').startOf('isoWeek');

      user.sessions.forEach(session => {
        const sessionStart = moment(session.start);
        const sessionEnd = moment(session.end);

        if (sessionStart.isSameOrAfter(currentDate) && sessionStart.isBefore(nextWeek)) {
          sessionsPerWeek.currentWeek++;
        } else if (sessionStart.isBetween(currentDate.clone().subtract(1, 'week'), currentDate, undefined, '()')) {
          sessionsPerWeek.lastWeek++;
        } else if (sessionStart.isBetween(currentDate.clone().subtract(2, 'week'), currentDate.clone().subtract(1, 'week'), undefined, '()')) {
          sessionsPerWeek.twoWeeksAgo++;
        } else if (sessionStart.isBetween(nextWeek, nextWeek.clone().add(1, 'week'), undefined, '()')) {
          sessionsPerWeek.nextWeek++;
        }
      });

      // sessionsPerWeek.thisWeek = sessionsPerWeek.currentWeek; // Set the value for sessions this week

      return sessionsPerWeek;
    }

    return { currentWeek: 0, lastWeek: 0, twoWeeksAgo: 0, nextWeek: 0,};
  };


  const sessionsPerWeek = calculateSessionsPerWeek();

  return (
    <div style={{ textAlign: 'center' }}>
      <div >
        <div>
          <h2>Sessions</h2>
          {user.sessions ? (
            <>
              <div>Number of Sessions per Week: {(sessionsPerWeek.thisWeek + sessionsPerWeek.lastWeek + sessionsPerWeek.twoWeeksAgo + sessionsPerWeek.nextWeek)/ 4}</div>
              <div>Number of Sessions Last Week: {sessionsPerWeek.lastWeek}</div>
              <div>Number of Sessions Two Weeks Ago: {sessionsPerWeek.twoWeeksAgo}</div>
              <div>Number of Sessions Next Week: {sessionsPerWeek.nextWeek}</div>
              <div>Number of Sessions This Week: {sessionsPerWeek.currentWeek}</div>
              {/* {user.sessions.map((session) => (
                <div key={session.id}>{session.start}</div>
              ))} */}
               <SessionsLineGraph sessions={sessionsPerWeek} />
            </>
          ) : (
            <div>No sessions found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MySessions;


