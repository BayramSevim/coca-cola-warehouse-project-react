import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';

const ShiftSelection = ({ selectedDateS, handleDateChangeS, getProduct, fetchProduct, checkProduct, product, checkShift }) => {
  const shiftArray = [
    {
      id: 0,
      shiftName: 'Tüm Vardiyalar'
    },
    {
      id: 1,
      shiftName: 'Vardiya-1 (00:00 - 08:00)'
    },
    {
      id: 2,
      shiftName: 'Vardiya-2 (08:00 - 16:00)'
    },
    {
      id: 3,
      shiftName: 'Vardiya-3 (16:00 - 00:00)'
    }
  ];
  return (
    <>
      <Box sx={{ p: 1, pb: 2 }}>
        <Grid item xs={5} md={5} container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <MainCard>
                <FormControl fullWidth className="form-control">
                  <DateTimePicker
                    select={selectedDateS}
                    defaultValue={dayjs(selectedDateS)}
                    onChange={handleDateChangeS}
                    format="DD.MM.YYYY HH:mm"
                  />
                </FormControl>
                <Box sx={{ minWidth: 150 }} marginTop={2}>
                  <FormControl fullWidth className="form-control">
                    <InputLabel id="demo-simple-select-label">Mamul Seçimi</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product.name}
                      label="Age"
                      onChange={(e) => checkProduct(e)}
                    >
                      {getProduct.map((product, index) => (
                        <MenuItem value={product.id} key={index}>
                          {product.code !== 'Tümü' ? product.code + ' | ' : ''}
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth className="form-control" style={{ marginTop: '10px' }}>
                    <InputLabel id="demo-simple-select-label">Vardiya Seçimi</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(e) => checkShift(e)}>
                      {shiftArray.map((shift, index) => (
                        <MenuItem value={shift.id} key={index}>
                          {shift.shiftName}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button variant="contained" onClick={fetchProduct} style={{ marginTop: '2%' }}>
                      Göster
                    </Button>
                  </FormControl>
                </Box>
              </MainCard>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Box>
    </>
  );
};

export default ShiftSelection;
