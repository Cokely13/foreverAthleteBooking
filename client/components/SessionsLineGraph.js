
import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLegend } from 'victory';
import moment from 'moment';

function SessionsLineGraph({ sessions, users }) {
  const currentDate = moment().startOf('isoWeek');
  const twoWeeksAgo = currentDate.clone().subtract(2, 'weeks').format('MMM D');
  const lastWeek = currentDate.clone().subtract(1, 'week').format('MMM D');
  const thisWeek = currentDate.format('MMM D');
  const nextWeek = currentDate.clone().add(1, 'week').format('MMM D');

  const datasets = Object.entries(sessions).map(([userId, sessionData], index) => {
    const data = [
      { x: twoWeeksAgo, y: sessionData.twoWeeksAgo || 0 },
      { x: lastWeek, y: sessionData.lastWeek || 0 },
      { x: thisWeek, y: sessionData.currentWeek || 0 },
      { x: nextWeek, y: sessionData.nextWeek || 0 },
    ];

    const user = users.find((user) => user.id == userId);


    return {
      label: `${user?.username || 'Unknown'}`,
      data,
      color: `hsl(${index * (360 / Object.keys(sessions).length)}, 100%, 50%)`,
    };
  });

  const legendData = datasets.map((dataset) => ({
    name: dataset.label,
    symbol: { fill: dataset.color },
  }));

  return (
    <div style={{ margin: '50px' }}>
      <h1>Sessions Per Week</h1>
      <VictoryChart height={250} style={{ margin: '20px auto' }}>
        <VictoryLegend
          x={60}
          y={0}
          // title="Users"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' }, title: { fontSize: 12 } }}
          data={legendData}
        />
        <VictoryAxis tickValues={[twoWeeksAgo, lastWeek, thisWeek, nextWeek]} />
        <VictoryAxis dependentAxis domain={[1, 15]} />
        {datasets.map((dataset) => (
          <VictoryLine key={dataset.label} data={dataset.data} style={{ data: { stroke: dataset.color } }} />
        ))}
      </VictoryChart>
    </div>
  );
}

export default SessionsLineGraph;
