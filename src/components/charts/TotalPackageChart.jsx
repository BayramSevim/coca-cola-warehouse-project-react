import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { GetAPIUrl } from '../../api/gama';

import './Chart.css';
import Selection from '../selection/Selection';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';

const Chart = () => {
  const [totalPackage, setTotalPackage] = useState([]);
  const [dayCheck, setDayCheck] = useState(3);

  const handleDayCheck = (day) => {
    setDayCheck(day);
  };

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=${dayCheck}`);
      const data = response.data;

      setTotalPackage(data.PackagingTotal);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dayCheck]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const getOptionsTotalPackageLine = (items) => {
    const series = [
      {
        name: 'Üretim Miktarı (ton)',
        type: 'column',
        data: items.map((item) => item.value)
      },
      {
        name: 'Kapasite',
        type: 'line',
        data: items.map((item) => item.valForCapacity)
      }
    ];

    const labels = Object.keys(items).map((key) => items[key].name);

    return {
      series,
      options: {
        chart: {
          height: 350,
          type: 'line'
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          width: [2, 4]
        },
        xaxis: {
          categories: labels,
          labels: {
            style: {
              colors: '#FFFFFF'
            }
          }
        },
        yaxis: [
          {
            title: {
              text: 'Üretim Miktarı (ton)',
              style: {
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold'
              }
            },
            tickAmount: 5
          },
          {
            opposite: true,
            title: {
              text: 'Kapasite',
              style: {
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold'
              }
            },
            min: 0,
            max: 8,
            tickAmount: 4
          }
        ]
      }
    };
  };

  const optionsByTotalPackageLine = getOptionsTotalPackageLine(totalPackage);

  return (
    <div>
      <MainCard>
        <Box sx={{ p: 1, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="h4">Total Paketleme Bilgileri</Typography>
          </Stack>
          <Selection sendDataToParent={handleDayCheck} />
        </Box>

        <ReactApexChart options={optionsByTotalPackageLine.options} series={optionsByTotalPackageLine.series} type="line" height={440} />
      </MainCard>
    </div>
  );
};

export default Chart;
