
import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLegend } from 'victory';

function SessionsLineGraph({ sessions, users }) {
  const datasets = Object.entries(sessions).map(([userId, sessionData], index) => {
    const data = [
      { x: 'Two Weeks Ago', y: sessionData.twoWeeksAgo || 0 },
      { x: 'Last Week', y: sessionData.lastWeek || 0 },
      { x: 'This Week', y: sessionData.currentWeek || 0 },
      { x: 'Next Week', y: sessionData.nextWeek || 0 },
    ];
    const user = users.find((user) => user.id == userId);


    return {
      label: `User ${user?.username || 'Unknown' }`,
      data,
      color: `hsl(${index * (360 / Object.keys(sessions).length)}, 100%, 50%)`,
    };
  });



  const legendData = datasets.map((dataset) => ({
    name: dataset.label,
    symbol: { fill: dataset.color },
  }));

  return (
    <div>
      <h2>Sessions Line Graph</h2>
      <VictoryChart>
        <VictoryAxis tickValues={['Two Weeks Ago', 'Last Week', 'This Week', 'Next Week']} />
        <VictoryAxis dependentAxis domain={[1, 15]} />
        <VictoryLegend
          x={50}
          y={0}
          title="Users"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' }, title: { fontSize: 12 } }}
          data={legendData}
        />
        {datasets.map((dataset) => (
          <VictoryLine key={dataset.label} data={dataset.data} style={{ data: { stroke: dataset.color } }} />
        ))}
      </VictoryChart>
    </div>
  );
}

export default SessionsLineGraph;
