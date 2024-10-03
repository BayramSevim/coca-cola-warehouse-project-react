// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <>
      <MainCard title="Sample Card">
        <Typography variant="body1">DASHBOARD</Typography>
      </MainCard>
    </>
  );
}
