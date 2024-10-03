import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import './Chart.css';
// third-party
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { GetAPIUrl } from '../../api/gama';

const GroupByProductChart = ({ productId, selectedDateS, selectedDateF }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchGroupProduct = async () => {
    setLoading(true);
    const response = await axios.get(`${GetAPIUrl()}/api/Product/GetProductByGroup`, {
      params: {
        dateS: selectedDateS,
        dateF: selectedDateF,
        productId: productId > 0 ? productId : 0
      }
    });
    setLoading(false);
    setProduct(response.data);
  };

  useEffect(() => {
    fetchGroupProduct();
  }, [selectedDateS, selectedDateF, productId]);

  const dataProduct = product.map((item) => item.sumTarget);
  const getOptionsByProductPie = (items) => ({
    chart: {
      foreColor: '#ffffff',
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
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
      show: false
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
  const optionsByProductPie = getOptionsByProductPie(product);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {loading ? <p></p> : <ReactApexChart options={optionsByProductPie} series={dataProduct} type="pie" height={450} />}
      </Grid>
    </Grid>
  );
};

export default GroupByProductChart;
