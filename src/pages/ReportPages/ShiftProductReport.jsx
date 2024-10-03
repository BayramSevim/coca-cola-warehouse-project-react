// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import ShiftProduct from 'Reports/ShiftProduct';

// ==============================|| SAMPLE PAGE ||============================== //

export default function GroupProductReport() {
  return (
    <>
      {/* <MainCard> */}
      <Typography variant="body1">
        <ShiftProduct />
      </Typography>
      {/* </MainCard> */}
    </>
  );
}
