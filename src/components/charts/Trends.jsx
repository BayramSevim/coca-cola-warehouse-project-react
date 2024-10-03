import React, { useState, useEffect, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "../Charts.css";

const Chart = () => {
  const [monthProduct, setMonthProduct] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://92.44.112.116:3002/api/Trend/GetTrendsByTagNameDynamic?startedDate=2024-06-06%2010:18&endedDate=2024-06-06%2010:23&tagName=PLC2!M1509AKIM.OUT`
      );
      const data = response.data;

      setMonthProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dataMonthProduct = monthProduct.map((item) => item.value);

  const getOptionsByMonthProductBar = (items) => ({
    chart: {
      height: 350,
      type: "area",
    },
    options: {
      dataLabels: {
        enabled: false,
      },
    },
    xaxis: {
      categories: items.map((item) => item.createdDate),
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  });

  const optionsByMonthProductBar = getOptionsByMonthProductBar(monthProduct);

  return (
    <div style={{ marginTop: "20px" }}>
      <h1>PLC2!M1509GAKIM.OUT</h1>
      <ReactApexChart
        options={optionsByMonthProductBar}
        series={[{ data: dataMonthProduct }]}
        type="area"
        height={540}
      />
    </div>
  );
};

export default Chart;
