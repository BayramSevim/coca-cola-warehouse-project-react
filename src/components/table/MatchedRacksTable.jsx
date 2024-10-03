import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { GetWarehouseUrl } from 'api/gama';

const MatchedRacksTable = forwardRef(({ onRowSelected }, ref) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [matchedRacks, setMatchedRacks] = useState([]);

  const getMatchedRacks = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMatchedRacks`)
      .then((res) => {
        if (res.data !== null) {
          setMatchedRacks(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    onRowSelected(row);
  };

  useImperativeHandle(ref, () => ({
    getMatchedRacks
  }));

  useEffect(() => {
    getMatchedRacks();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '70%' }}>Malzeme</TableCell>
              <TableCell sx={{ width: '30%' }}>Raf</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matchedRacks.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  border: selectedRow?.cellId === row.cellId ? '2px solid green' : 'none'
                }}
                onClick={() => handleRowClick(row)}
                selected={selectedRow?.cellId === row.cellId}
              >
                <TableCell sx={{ width: '70%' }}>
                  {row.materialCode} / {row.materialName}
                </TableCell>
                <TableCell sx={{ width: '30%' }}>{row.rackName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default MatchedRacksTable;
