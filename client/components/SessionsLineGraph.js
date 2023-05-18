import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

function SessionsLineGraph({ sessions }) {

  console.log("sessions", sessions)
  const chartData = Object.entries(sessions)
    .map(([week, count]) => ({ x: week, y: count }))
    // .sort((a, b) => {
    //   const order = ['twoWeeksAgo', 'lastWeek', 'currentWeek', 'nextWeek'];
    //   return order.indexOf(a.x) - order.indexOf(b.x);
    // });

  return (
    <div>
      <h2>Sessions</h2>
      <VictoryChart>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryLine data={chartData} style={{ data: { stroke: 'blue' } }} />
      </VictoryChart>
    </div>
  );
}



export default SessionsLineGraph;
