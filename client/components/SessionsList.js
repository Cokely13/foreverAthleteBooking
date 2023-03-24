import React from 'react';

const SessionsList = ({ sessions }) => {
  const renderSessions = () => {
    return sessions.map(session => {
      // Convert the start property to a date object
      const startDate = new Date(session.start);

      // Format the date and time strings
      const date = startDate.toLocaleDateString();
      const time = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return (
        <tr key={session.id}>
          <td>{date}</td>
          <td>{time}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {renderSessions()}
      </tbody>
    </table>
  );
};

export default SessionsList;
