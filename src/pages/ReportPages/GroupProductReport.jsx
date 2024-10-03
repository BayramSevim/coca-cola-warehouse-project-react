// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import GroupByProduct from 'Reports/GroupByProduct';

// ==============================|| SAMPLE PAGE ||============================== //

export default function GroupProductReport() {
  return (
    <>
      {/* <MainCard> */}
      <Typography variant="body1">
        <GroupByProduct />
      </Typography>
      {/* </MainCard> */}
    </>
  );
}
