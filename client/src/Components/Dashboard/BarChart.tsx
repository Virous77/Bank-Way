import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartBox } from "./dashboard.style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const BarChart = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Activity",
        data: [12, 19, 8, 5, 2, 30, 12],
        backgroundColor: [
          "rgb(255, 200, 532)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(255, 100, 332)",
        ],
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartBox>
      <Line options={options} data={data} />
    </ChartBox>
  );
};

export default BarChart;
