import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from '@mui/material';
import { GetWarehouseUrl } from 'api/gama';
import axios from 'axios';
import { Refresh } from 'iconsax-react';

const icons = {
  refresh: Refresh
};

const DataTable = forwardRef(({ materialId, onDataFetched }, ref) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const getData = () => {
    axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetRackInfoByMaterialId?materialId=${materialId}`)
      .then((res) => {
        setData(res.data);
        onDataFetched(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [materialId]);

  useImperativeHandle(ref, () => ({
    getData
  }));

  const handleRowClick = (row) => {
    setSelectedRow(row);
    const value = row.quantity;
    setInputValue(value);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Raf Adı</TableCell>
              <TableCell>Malzeme</TableCell>
              <TableCell>Adet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  border: selectedRow?.cellId === row.cellId ? '2px solid green' : 'none'
                }}
                onClick={() => handleRowClick(row)}
                selected={selectedRow?.cellId === row.cellId}
              >
                <TableCell>{row.rackName}</TableCell>
                <TableCell>
                  {row.materialCode} / {row.materialName}
                </TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default DataTable;
