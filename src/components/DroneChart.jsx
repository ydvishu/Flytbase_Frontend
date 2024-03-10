import React from 'react';
import { Line } from 'react-chartjs-2';

const DroneChart = ({ data }) => {
  const chartData = {
    labels: data.map((point, index) => index + 1),
    datasets: [
      {
        label: 'Drone Motion',
        data: data.map((point) => ({ x: point.longitude, y: point.latitude })),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default DroneChart;
