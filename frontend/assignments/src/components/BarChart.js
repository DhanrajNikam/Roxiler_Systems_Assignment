import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Number of Items",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h3>Transactions Bar Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
