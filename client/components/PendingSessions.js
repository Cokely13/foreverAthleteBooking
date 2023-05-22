// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSessions, deleteSession } from '../store/allSessionsStore';
// import { updateSingleSession } from '../store/singleSessionStore';

// export default function PendingSessions() {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   const { userId } = useParams();
//   const [statusView, setStatusView] = useState();

//   useEffect(() => {
//     dispatch(fetchSessions());
//   }, [dispatch]);

//   const sessions = useSelector((state) => state.allSessions);

//   const handleStatusChange = (session, newValue) => {
//     session.confirm = newValue
//     dispatch(updateSingleSession(session.Id, { confirmed: newValue }));
//   };

//   const handleDelete = (sessionId) => {
//     dispatch(deleteSession(sessionId));
//   };

//   return (
//     <div>
//       <div className="text-center">
//         {sessions
//           ? sessions
//               .filter((session) => session.confirmed === 'pending')
//               .map((session) => {
//                 const startDate = new Date(session.start);

//                 // Format the date and time strings
//                 const dateTime = startDate.toLocaleString();

//                 return (
//                   <tr key={session.id}>
//                     <td>{dateTime}</td>
//                     <td>{session.user.username}</td>
//                     <td>
//                       <select
//                         value={session.confirmed}
//                         onChange={(e) => handleStatusChange(session, e.target.value)}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="confirmed">Confirmed</option>
//                         <option value="denied">Denied</option>
//                       </select>
//                     </td>
//                     <td>
//                       <button onClick={() => handleDelete(session.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 );
//               })
//           : <div></div>}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSessions, deleteSession } from '../store/allSessionsStore';
import { updateSingleSession } from '../store/singleSessionStore';

export default function PendingSessions() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [statusView, setStatusView] = useState();
  const [usernameFilter, setUsernameFilter] = useState('');

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const sessions = useSelector((state) => state.allSessions);

  const handleStatusChange = (session, newValue) => {
    session.confirm = newValue;
    dispatch(updateSingleSession(session.Id, { confirmed: newValue }));
  };

  const handleDelete = (sessionId) => {
    dispatch(deleteSession(sessionId));
  };

  const filteredSessions = sessions
    ? sessions.filter((session) => session.confirmed === 'pending')
    : [];

  const sortedSessions = filteredSessions.sort((a, b) => new Date(a.start) - new Date(b.start));

  const uniqueUsernames = Array.from(new Set(sortedSessions.map((session) => session.user.username)));

  const handleUsernameFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const filteredAndSortedSessions = sortedSessions.filter((session) =>
    session.user.username.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  return (
    <div>
      <div className="text-center">
        <select value={usernameFilter} onChange={handleUsernameFilterChange}>
          <option value="">All</option>
          {uniqueUsernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
        <table>
          <tbody>
            {filteredAndSortedSessions.map((session) => {
              const startDate = new Date(session.start);
              const dateTime = startDate.toLocaleString();

              return (
                <tr key={session.id}>
                  <td>{dateTime}</td>
                  <td>{session.user.username}</td>
                  <td>
                    <select
                      value={session.confirmed}
                      onChange={(e) => handleStatusChange(session, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="denied">Denied</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(session.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

