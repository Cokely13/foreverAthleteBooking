import React from 'react';

const SessionsList = ({ sessions }) => {
  const sortedSessions = sessions.sort((a, b) => new Date(a.start) - new Date(b.start));

  const renderSessions = (category) => {
    return sortedSessions
      .filter(session => {
        const startDate = new Date(session.start);
        const isPastSession = startDate < new Date();
        return isPastSession === (category === 'past');
      })
      .map(session => {
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

  const upcomingSessions = renderSessions('upcoming');
  const pastSessions = renderSessions('past');

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}>Upcoming Sessions</h2>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {upcomingSessions}
        </tbody>
      </table>
      <h2 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}>Past Sessions</h2>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {pastSessions}
        </tbody>
      </table>
    </div>
  );
};

export default SessionsList;
