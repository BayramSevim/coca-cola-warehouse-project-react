import { I3Dcube, I3DCubeScan, ArrowSwapHorizontal, Share, User, Autonio, AddSquare, Edit } from 'iconsax-react';
import '../Dashboard/Dashboard.css';
// type

// icons
// icons
const icons = {
  malKabul: I3Dcube,
  malCikis: I3DCubeScan,
  transfer: ArrowSwapHorizontal,
  depo: Share,
  user: User,
  raf: AddSquare,
  edit: Edit
};

// project-imports
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

// ==============================|| SAMPLE PAGE ||============================== //

export default function RafIslemleri() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="btn-dash"
        onClick={() => {
          navigate('/depo/raf-ekleme');
        }}
      >
        <MainCard>
          <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
            <Grid item>
              <icons.raf color="#37d67a" size={48} /> {/* Icon */}
            </Grid>
            <Grid item>Raf Malzeme Eşleme </Grid>
          </Grid>
        </MainCard>
      </button>
      <button
        className="btn-dash"
        onClick={() => {
          navigate('/depo/raf-guncelleme');
        }}
      >
        <MainCard>
          <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
            <Grid item>
              <icons.edit color="#f47373" size={48} /> {/* Icon */}
            </Grid>
            <Grid item>Raf Guncelle </Grid>
          </Grid>
        </MainCard>
      </button>

      <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item>
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
    </>
  );
}
