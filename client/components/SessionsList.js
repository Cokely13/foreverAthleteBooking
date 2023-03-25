// import React from 'react';

// const SessionsList = ({ sessions }) => {
//   const renderSessions = () => {
//     return sessions.map(session => {
//       // Convert the start property to a date object
//       const startDate = new Date(session.start);

//       // Format the date and time strings
//       const date = startDate.toLocaleDateString();
//       const time = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//       return (
//         <tr key={session.id}>
//           <td>{date}</td>
//           <td>{time}</td>
//         </tr>
//       );
//     });
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Time</th>
//         </tr>
//       </thead>
//       <tbody>
//         {renderSessions()}
//       </tbody>
//     </table>
//   );
// };

// export default SessionsList;

import React from 'react';

const SessionsList = ({ sessions }) => {
  const renderSessions = (category) => {
    return sessions
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
    <div>
      <h2>Upcoming Sessions</h2>
      <table>
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
      <h2>Past Sessions</h2>
      <table>
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
