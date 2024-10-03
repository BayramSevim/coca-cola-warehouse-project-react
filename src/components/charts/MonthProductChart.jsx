import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './Chart.css';
import { GetAPIUrl } from '../../api/gama';

// COMPONENTS
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';

const Chart = () => {
  const [monthProduct, setMonthProduct] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`);
      const data = response.data;

      setMonthProduct(data.MonthlyProduction);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dataMonthProduct = monthProduct.map((item) => item.actAmount);

  const getOptionsByMonthProductBar = (items) => ({
    chart: {
      height: 400,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      foreColor: 'white',
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: items.map((item) => new Date(item.productionDate).toLocaleDateString()),
      labels: {
        style: {
          colors: '#FFFFFF'
        }
      },
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#FFFFFF',
            colorTo: '#FFFFFF',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: undefined,
        title: {
          formatter: () => 'Üretilen Miktar(ton): '
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + '%';
        }
      },
      tickAmount: 5
    },
    title: {
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#FFFFF'
      }
    }
  });

  const optionsByMonthProductBar = getOptionsByMonthProductBar(monthProduct);

  return (
    <div>
      <MainCard>
        <Box sx={{ p: 1, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="h4">Aylık Üretim Bilgileri</Typography>
          </Stack>
        </Box>
        <ReactApexChart options={optionsByMonthProductBar} series={[{ data: dataMonthProduct }]} type="bar" height={500} />
      </MainCard>
    </div>
  );
};

export default Chart;
