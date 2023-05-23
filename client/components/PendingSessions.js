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
  const [selectedSession, setSelectedSession] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const sessions = useSelector((state) => state.allSessions);

  const handleStatusChange = (session, newValue) => {
    setSelectedSession(session);
    console.log('select', session);
    console.log('value', newValue);
  };

  const handleUpdateStatus = () => {
    if (selectedSession) {
      dispatch(updateSingleSession(selectedSession.Id, { confirmed: selectedSession.confirm }))
        .then(setCount(count + 1));
    }
  };

  const handleConfirmed = (session) => {
    session.confirmed = 'confirmed';
    dispatch(updateSingleSession(session))
      .then(() => window.location.reload());
  };

  const handleDenied = (session) => {
    session.confirmed = 'denied';
    dispatch(updateSingleSession(session))
      .then(() => window.location.reload());
  };

  const filteredSessions = sessions
    ? sessions.filter((session) => session.confirmed === 'pending')
    : [];

  const sortedSessions = filteredSessions.sort((a, b) => new Date(a.start) - new Date(b.start));

  const uniqueUsernames = Array.from(new Set(sortedSessions.map((session) => session.user.username)));

  const handleUsernameFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const handleSessionSelection = (session) => {
    setSelectedSession(session);
  };

  const filteredAndSortedSessions = sortedSessions.filter((session) =>
    session.user.username.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  return (
    <div>
     {filteredAndSortedSessions.length ? <div className="text-center">
        <select value={usernameFilter} onChange={handleUsernameFilterChange}>
          <option value="">All</option>
          {uniqueUsernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
        <table style={{ margin: '0 auto' }}>
          <tbody>
            {filteredAndSortedSessions.map((session) => {
              const startDate = new Date(session.start);
              const dateTime = startDate.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              });

              return (
                <tr style={{ fontSize: '25px' }} key={session.id}>
                  <td style={{ paddingRight: '20px' }}>{dateTime}</td>
                  <td style={{ paddingRight: '20px' }}>
                    <Link to={`/clients/${session.user.id}`}>{session.user.username}</Link>
                  </td>
                  <td style={{ paddingRight: '20px' }}>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '2px solid black',
                      }}
                      onClick={() => handleConfirmed(session)}
                    >
                      Confirm
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#FF0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '2px solid black',
                      }}
                      onClick={() => handleDenied(session)}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> : <h1> No Pending Sessions </h1>}
    </div>
  );
}
