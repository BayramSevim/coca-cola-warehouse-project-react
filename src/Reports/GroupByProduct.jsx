import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from '../components/MasterDetail/GroupByProduct/MasterDetail';
import Grid from '@mui/material/Grid';
import ProductSelection from '../components/selection/ProductSelection';
import { GetAPIUrl } from '../api/gama';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import GroupByProductChart from 'components/charts/GroupByProductChart';

const Product = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  //UseStates
  const [product, setProduct] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productId, setProductId] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(selectedDateS));
  const formattedDateF = formatDate(new Date(selectedDateF));

  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

  const fetchProduct = async () => {
    const response = await axios.get(`${GetAPIUrl()}/api/Product/GetProductByGroup`, {
      params: {
        dateS: formattedDateS,
        dateF: formattedDateF,
        productId: productId > 0 ? productId : 0
      }
    });

    setProduct(response.data);
  };

  const getProductId = async () => {
    const response = await axios.get(`${GetAPIUrl()}/api/Product/GetProductsFilters`);
    setGetProduct(response.data);
  };

  const checkProduct = (e) => {
    const selectedValue = e.target.value;
    setProductId(selectedValue);
  };

  useEffect(() => {
    fetchProduct();
    getProductId();
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
        <Grid container rowSpacing={5} columnSpacing={2.75}>
          <Grid item xs={12} md={8.5}>
            <MasterDetail dateS={selectedDateS} dateF={selectedDateF} productId={productId} />
          </Grid>
          <Grid item xs={5} md={3.5} mt={5}>
            <GroupByProductChart productId={productId} selectedDateS={selectedDateS} selectedDateF={selectedDateF} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Product;
