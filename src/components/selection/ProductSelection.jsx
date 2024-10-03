import React from 'react';
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

const Selection = ({
  selectedDateS,
  selectedDateF,
  handleDateChangeS,
  handleDateChangeF,
  getProduct,
  fetchProduct,
  checkProduct,
  product
}) => {
  return (
    <>
      <Box sx={{ p: 1, pb: 2 }}>
        <Grid item xs={5} md={5} container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <MainCard>
                <DateTimePicker
                  label="Başlangıç Tarihi"
                  select={selectedDateS}
                  defaultValue={dayjs(selectedDateS)}
                  onChange={handleDateChangeS}
                  format="DD.MM.YYYY HH:mm"
                />
                <DateTimePicker
                  label="Bitiş Tarihi"
                  defaultValue={dayjs(selectedDateF)}
                  select={selectedDateF}
                  format="DD.MM.YYYY HH:mm"
                  onChange={handleDateChangeF}
                />
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

export default Selection;
