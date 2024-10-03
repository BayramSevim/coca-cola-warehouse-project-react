import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { GetAPIUrl } from '../../api/gama';
import './Chart.css';
import Selection from '../selection/Selection';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Back } from 'iconsax-react';

const Chart = () => {
  const [packages, setPackages] = useState([]);
  const [dayCheck, setDayCheck] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDayCheck = (day) => {
    setDayCheck(day);
  };

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=${dayCheck}`);
      const data = response.data;
      setPackages(data.Top10Pack);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [dayCheck]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dataPackages = packages.map((item) => item.amount);

  const getOptionsByPackagesPie = (items) => ({
    chart: {
      width: 680,
      foreColor: '#ffffff',
      type: 'pie'
    },
    colors: [
      '#2C4E80',
      '#0A6847',
      '#FFC55A',
      '#FC4100',
      '#3C5B6F',
      '#153448',
      '#41B06E',
      '#074173',
      '#DC6B19',
      '#704264',
      '#453F78',
      '#E72929',
      '#008DDA',
      '#430A5D',
      '#00224D',
      '#E8751A'
    ],
    markers: {
      colors: ['#FFFFFF']
    },
    labels: items.map((item) => item.name),
    legend: {
      position: 'right',
      fontSize: '14px',
      offsetX: 0,
      offsetY: 7
    },
    responsive: [
      {
        breakpoint: 880,
        options: {
          chart: {
            width: 800
          }
        }
      }
    ]
  });

  const optionsByPackagesPie = getOptionsByPackagesPie(packages);
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
      <div className="front">
        <MainCard>
          <Box sx={{ p: 1, pb: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Typography variant="h4">Paketleme Bilgileri</Typography>
            </Stack>
            <Selection sendDataToParent={handleDayCheck} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {loading ? <p></p> : <ReactApexChart options={optionsByPackagesPie} series={dataPackages} type="pie" height={440} />}
            </Grid>
            <Grid item xs={8} sm={12}>
              <MainCard content={false} border={false} sx={{ bgcolor: 'background.transparent' }}>
                <div onClick={() => setFlipped(true)} className="flip-button">
                  <Stack
                    alignItems="center"
                    sx={{
                      p: 1,
                      '&:hover': {
                        backgroundColor: 'background.default', // Hover olduğunda arka plan rengini değiştirir
                        transition: '0.5s' // Hover olduğunda hafif büyütür
                      }
                    }}
                    spacing={0.2}
                    style={{ cursor: 'pointer' }}
                  >
                    {'>>>  Üretilenleri Gör  <<<'}
                  </Stack>
                </div>
              </MainCard>
            </Grid>
          </Grid>
        </MainCard>
      </div>
      <div className="back">
        <a onClick={() => setFlipped(false)} className="back-button">
          <Back size="32" color="#d9e3f0" />
        </a>
        <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 550 }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead style={{ backgroundColor: '#222e38' }}>
              <TableRow>
                <TableCell align="center">Ürün Kodu</TableCell>
                <TableCell align="center">Ürün Adı</TableCell>
                <TableCell align="center">Miktar(kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: '#222e38' }}>
              {packages.map((row, index) => (
                <TableRow style={{ color: 'white' }} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.code}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Chart;
