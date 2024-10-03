// material-ui
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Refresh } from 'iconsax-react';
import { useNavigate } from 'react-router';
import MasterDetail from '../../components/MasterDetail/StokBilgilendirme/MasterDetail';

// ==============================|| SAMPLE PAGE ||============================== //

const icons = {
  refresh: Refresh
};
export default function StokBilgilendirme() {
  const navigate = useNavigate();
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  const handleOrientationChange = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);
  return (
    <div>
      {isLandscape ? (
        <Grid>
          <Grid>
            <Grid container rowSpacing={4.5} mt={-5} display={'flex'} justifyContent={'left'} columnSpacing={0.75}>
              <Grid item sx={{ width: '100%' }}>
                <MasterDetail />
              </Grid>
            </Grid>
          </Grid>

          <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item mt={1}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Geri
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid mt={5}>
          <MainCard>
            <Grid container rowSpacing={1.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
              <Grid item>
                <icons.refresh size={32} color="lime" />
              </Grid>
              <Grid item>
                <Typography textAlign={'center'} fontSize={18} fontWeight={'bold'}>
                  Stok Bilgisini Görmek İçin Lütfen Telefonu Yan Çeviriniz
                </Typography>
              </Grid>
            </Grid>
          </MainCard>
          <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item mt={1}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Geri
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
