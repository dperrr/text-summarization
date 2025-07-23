import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TfidfHeatmap = ({ keywordsWithScores }) => {
  const labels = keywordsWithScores.map(([word]) => word);
  const scores = keywordsWithScores.map(([, score]) => parseFloat(score.toFixed(4)));

  const data = {
    labels,
    datasets: [
      {
        label: 'TF-IDF Score',
        data: scores,
        backgroundColor: (context) => {
          const value = context.raw;
          const max = Math.max(...scores);
          const alpha = value / max;
          return `rgba(75, 0, 130, ${alpha})`; 
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `TF-IDF: ${ctx.raw}`,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-3">TF-IDF Keyword Heatmap</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TfidfHeatmap;
