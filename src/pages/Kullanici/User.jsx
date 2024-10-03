import { I3Dcube, I3DCubeScan, ArrowSwapHorizontal, Share, User, Autonio, UserAdd, UserEdit } from 'iconsax-react';
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
  raf: Autonio,
  userAdd: UserAdd,
  userEdit: UserEdit
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
          navigate('/depo/kullanici-ekleme');
        }}
      >
        <MainCard>
          <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
            <Grid item>
              <icons.userAdd color="#37d67a" size={48} /> {/* Icon */}
            </Grid>
            <Grid item>Kullanıcı Ekle {/* Text */}</Grid>
          </Grid>
        </MainCard>
      </button>
      <button
        className="btn-dash"
        onClick={() => {
          navigate('/depo/kullanici-guncelleme');
        }}
      >
        <MainCard>
          <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
            <Grid item>
              <icons.userEdit color="#f47373" size={48} /> {/* Icon */}
            </Grid>
            <Grid item>Kullanıcı Güncelle {/* Text */}</Grid>
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
