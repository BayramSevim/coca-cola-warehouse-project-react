import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from '@mui/material';
import { GetWarehouseUrl } from 'api/gama';
import axios from 'axios';
import { Refresh } from 'iconsax-react';
import { toast } from 'react-toastify';

const icons = {
  refresh: Refresh
};

const DataTable = forwardRef(({ barcode, onDataFetched, onRowSelect }, ref) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const getData = () => {
    axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetRackInfoByBarcode?barcode=${barcode}`)
      .then((res) => {
        setData(res.data);
        onDataFetched(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [barcode]);

  useImperativeHandle(ref, () => ({
    getData
  }));

  const handleRowClick = (row) => {
    setSelectedRow(row);
    const value = row.quantity;
    setInputValue(value);
    onRowSelect(row.materialId);
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
                  border: selectedRow?.materialId === row.materialId ? '2px solid green' : 'none'
                }}
                onClick={() => handleRowClick(row)}
                selected={selectedRow?.materialId === row.materialId}
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
