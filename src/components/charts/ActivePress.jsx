import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Chart.css';
import { GetAPIUrl } from 'api/gama';

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

const ActiveProduction = () => {
  const [activePresses, setActivePresses] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`);
      const data = response.data;
      setActivePresses(data.ActivePresses);
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
          <Typography variant="h4">Anlık Press Bilgileri</Typography>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 550 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#222e38' }}>
            <TableRow>
              <TableCell align="center">Pres Adı</TableCell>
              <TableCell align="center">Mamül Adı</TableCell>
              <TableCell align="center">Mamül Kodu</TableCell>
              <TableCell align="center">Başlangıç Tarihi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#222e38' }}>
            {activePresses.map((row, index) => (
              <TableRow style={{ color: 'white' }} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {row.pressName}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.rawMatName}
                </TableCell>
                <TableCell align="center" scope="row">
                  {row.rawMatCode}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {new Date(row.createdDate).toLocaleDateString()}
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
