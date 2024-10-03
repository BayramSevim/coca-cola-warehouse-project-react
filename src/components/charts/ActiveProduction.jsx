import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Chart.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { GetAPIUrl } from 'api/gama';

const ActiveProduction = () => {
  const [activeProduction, setActiveProduction] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`);
      const data = response.data;
      setActiveProduction(data.ActiveProductions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div style={{ padding: 30 }}>
      <Box sx={{ p: 1, pb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="h4">Anlık Üretim Bilgileri</Typography>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 550 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#222e38' }}>
            <TableRow>
              <TableCell align="center">Batch No</TableCell>
              <TableCell align="center">Formül Adı</TableCell>
              <TableCell align="center">Formül Kodu</TableCell>
              <TableCell align="center">Silo Adı</TableCell>
              <TableCell align="center">Başladı Mı</TableCell>
              <TableCell align="center">Miktar(kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#222e38' }}>
            {activeProduction.map((row, index) => (
              <TableRow style={{ color: 'white' }} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {row.batchNo}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.formulaName}
                </TableCell>
                <TableCell align="center" scope="row">
                  {row.formulaCode}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.siloName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.isStarted ? 'Başladı' : 'Başlamadı'}
                </TableCell>
                <TableCell align="center" scope="row">
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveProduction;
