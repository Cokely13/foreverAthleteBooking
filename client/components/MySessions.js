import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';
import moment from 'moment';
import SessionsLineGraph from './SessionsLineGraph';
import { fetchSessions } from '../store/allSessionsStore';
import { fetchUsers } from '../store/allUsersStore';

function MySessions() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const sessions = useSelector((state) => state.allSessions);
  const users = useSelector((state) => state.allUsers);
  const [selectedUserId, setSelectedUserId] = useState('all');

  useEffect(() => {
    dispatch(fetchSingleUser(id));
    dispatch(fetchSessions());
    dispatch(fetchUsers());
  }, [dispatch, id]);

  function calculateSessionsPerWeek(sessions) {
    const sessionsPerWeekByUserId = {};

    sessions.forEach((session) => {
      const { userId, start } = session;

      const currentDate = moment().startOf('isoWeek');
      const nextWeek = moment().add(1, 'week').startOf('isoWeek');

      if (!sessionsPerWeekByUserId[userId]) {
        sessionsPerWeekByUserId[userId] = {
          twoWeeksAgo: 0,
          lastWeek: 0,
          currentWeek: 0,
          nextWeek: 0,
        };
      }


      const sessionsPerWeek = sessionsPerWeekByUserId[userId];
      const sessionStart = moment(start);

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

    return sessionsPerWeekByUserId;
  }

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };


  const filteredSessions = selectedUserId === 'all' ? sessions : sessions.filter((session) => session.userId == selectedUserId);

  const sessionsPerWeekByUserId = calculateSessionsPerWeek(filteredSessions);


  return (
    <div style={{ backgroundColor: 'white', margin: '0 50px 50px', textAlign: 'center', padding: '20px', border: '1px solid black', borderRadius: "10px" }}>
      {/* <h2>Sessions</h2> */}
      <select id="userId" value={selectedUserId} onChange={handleUserChange}>
//           <option value="all">All</option>
{users.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
//           {/* Render dropdown options based on available user IDs */}
//           {/* Replace with your actual user ID data */}
//         </select>
      <SessionsLineGraph sessions={sessionsPerWeekByUserId} users={users} />
    </div>
  );
}

export default MySessions;
