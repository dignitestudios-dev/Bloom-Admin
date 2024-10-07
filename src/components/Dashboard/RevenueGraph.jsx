import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { RxCaretDown } from "react-icons/rx";

// Register necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": " + context.raw;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false, // Hide the grid lines
      },
      ticks: {
        display: false, // Hide the tick labels
      },
      border: {
        display: false, // Hide the axis line
      },
    },
  },
};
function getDaysArray() {
  const daysArray = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate the array with days in "DD" format
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = day.toString().padStart(2, "0");
    daysArray.push(formattedDay);
  }

  return daysArray;
}

function getRandomDataArray() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate an array with random data
  const randomDataArray = Array.from(
    { length: daysInMonth },
    () => Math.floor(Math.random() * 100) + 1
  );

  return randomDataArray;
}

// Sample data
const data = {
  labels: getDaysArray(),
  datasets: [
    {
      label: "Revenue",
      data: getRandomDataArray(),
      backgroundColor: "rgba(160, 32, 240, 0.2)",
      borderColor: "rgba(160, 32, 240, 1)",
      borderWidth: 1,
      borderRadius: 50, // This adds rounded corners
      borderSkipped: false,
    },
  ],
};
const RevenueGraph = () => {
  return (
    <div className="w-full bg-white shadow flex flex-col justify-start items-start gap-2 col-span-3 h-[32rem] p-4  rounded-2xl shadow-gray-300">
      <div className="w-full flex justify-between items-start h-[2rem]">
        <div className="w-auto flex flex-col justify-start items-start ">
          <h2 className="text-xl font-bold text-gray-900">User Growth</h2>
          <span className="text-sm text-gray-500">
            Select a month to view analytics
          </span>
        </div>

        <button className="w-28 h-8 rounded-md border flex px-2 items-center justify-between text-purple-500 border-purple-500 bg-purple-500/5 text-sm font-normal">
          <span>January</span>
          <span>
            <RxCaretDown />
          </span>
        </button>
      </div>
      <div className="h-[26rem] w-full flex justify-center items-end">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueGraph;
