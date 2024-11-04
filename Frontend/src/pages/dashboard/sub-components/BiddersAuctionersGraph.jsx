import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers = [], totalBidders = [] } = useSelector(
    (state) => state.superAdmin
  );

  // Function to fill missing months with 0 or map data to months
  const fillData = (data) => {
    const filledData = new Array(12).fill(0);
    data.forEach((value, index) => {
      if (value !== undefined && value !== null) {
        filledData[index] = value;
      }
    });
    console.log("Filled Data:", filledData); // Debugging log
    return filledData;
  };

  // Ensure data has values for all 12 months
  const filledBidders = fillData(totalBidders);
  const filledAuctioneers = fillData(totalAuctioneers);

  // Calculate max value for dynamic y-axis scaling
  const maxVal = Math.max(...filledBidders, ...filledAuctioneers, 10);

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: filledBidders,
        borderColor: "#D6482B",
        fill: false,
      },
      {
        label: "Number of Auctioneers",
        data: filledAuctioneers,
        borderColor: "#fdba88",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxVal,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders And Auctioneers Registered",
      },
    },
  };

  // Debug the raw Redux data to confirm correct values
  useEffect(() => {
    console.log("Total Auctioneers:", totalAuctioneers);
    console.log("Total Bidders:", totalBidders);
  }, [totalAuctioneers, totalBidders]);

  return <Line data={data} options={options} />;
};

export default BiddersAuctioneersGraph;
