// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Product from 'Reports/Product';
import ProductSelection from '../../components/selection/ProductSelection';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ProductReport() {
  return (
    <>
      {/* <MainCard> */}
      <Typography variant="body1">
        <Product />
      </Typography>
      {/* </MainCard> */}
    </>
  );
}
