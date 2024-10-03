import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Header from '../../Templates/Header';
import 'react-datepicker/dist/react-datepicker.css';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import MasterDetail from '../components/MasterDetail/Product/MasterDetail';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ProductSelection from '../components/selection/ProductSelection';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { GetAPIUrl } from '../api/gama';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';

const Product = ({ logOut }) => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const [product, setProduct] = useState([]);

  //UseStates

  const [getProduct, setGetProduct] = useState([]);
  const [productId, setProductId] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const loadingScreen = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //UseStates
  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

  // Get Data And UseEffects
  const fetchProduct = async () => {
    const response = await axios.get(
      // "http://92.44.112.116:3001/api/Product/GetProductByDate",
      `${GetAPIUrl()}/api/Product/GetProductByDate`,
      {
        params: {
          dateS: selectedDateS,
          dateF: selectedDateF,
          typeId: 0,
          productId: productId > 0 ? productId : 0,
          formulaId: 0
        }
      }
    );
    loadingScreen();
    setProduct(response.data);
  };

  const getProductId = async () => {
    const response = await axios.get(
      // "http://92.44.112.116:3001/api/Product/GetProductsFilters"
      `${GetAPIUrl()}/api/Product/GetProductsFilters`
    );
    setGetProduct(response.data);
  };

  const checkProduct = (e) => {
    const selectedValue = e.target.value;
    setProductId(selectedValue);
  };

  useEffect(() => {
    fetchProduct();
    getProductId();
    loadingScreen();
  }, []);

  // Get Data And UseEffects

  return (
    <>
      <Box sx={{ pb: 3, mt: -3 }}>
        <Grid item xs={8} md={8}>
          <ProductSelection
            selectedDateS={selectedDateS}
            selectedDateF={selectedDateF}
            handleDateChangeS={handleDateChangeS}
            handleDateChangeF={handleDateChangeF}
            getProduct={getProduct}
            fetchProduct={fetchProduct}
            checkProduct={checkProduct}
            product={product}
          />
        </Grid>
      </Box>
      <MainCard>
        <MasterDetail dateS={selectedDateS} dateF={selectedDateF} productId={productId} />
      </MainCard>
    </>
  );
};

export default Product;
