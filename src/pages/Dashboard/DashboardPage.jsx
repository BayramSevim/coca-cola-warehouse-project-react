import { I3Dcube, I3DCubeScan, ArrowSwapHorizontal, Share, User, Autonio, BoxTime, InfoCircle } from 'iconsax-react';
import './Dashboard.css';
// type
import Button from '@mui/material/Button';
// icons
// icons
const icons = {
  malKabul: I3Dcube,
  malCikis: I3DCubeScan,
  transfer: ArrowSwapHorizontal,
  depo: Share,
  user: User,
  raf: Autonio,
  rapor: BoxTime,
  stock: InfoCircle
};

// project-imports
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function DashboardPage() {
  const [storedUser, setStoredUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loginnedUser'));
    setStoredUser(userData);
  }, []);

  const handleChange = () => {
    toast(
      ({ closeToast }) => (
        <div className="toast-confirmation">
          <p>Çıkış yapmak istediğinize emin misiniz?</p>
          <div className="toast-buttons">
            <button className="btn-confirm" onClick={() => confirmLogout()}>
              Evet
            </button>
            <button className="btn-cancel" onClick={closeToast}>
              Hayır
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        className: 'custom-toast-center' // Ekranın ortasına özel stil
      }
    );

    const confirmLogout = () => {
      navigate(`/login`);
      toast.dismiss();
    };
  };

  const yetkiler = Array.isArray(storedUser.yetki)
    ? storedUser.yetki
    : typeof storedUser.yetki === 'string'
      ? storedUser.yetki.split(',')
      : [];

  return (
    <>
      <ToastContainer />
      {yetkiler[0] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/mal-kabul');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.malKabul color="#37d67a" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Malzeme Kabul {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      {yetkiler[1] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/mal-cikis');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.malCikis color="#f47373" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Malzeme Çıkış {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}
      {yetkiler[2] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/raf-islemleri');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.raf color="#ba68c8" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Raf İşlemleri {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      {yetkiler[3] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/malzeme-hareketleri');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.rapor color="#ff8a65" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Malzeme Hareketleri {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      {yetkiler[4] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/transfer');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.transfer color="#2ccce4" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Transfer {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      {yetkiler[5] === '1' && (
        <button
          className="btn-dash"
          onClick={() => {
            navigate('/depo/stok-bilgilendirme');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.stock color="#F4CE14" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Stok Bilgilendirme {/* Text */}</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      {yetkiler[6] === '1' && (
        <button
          style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
          onClick={() => {
            navigate('/depo/kullanici-islemleri');
          }}
        >
          <MainCard>
            <Grid className="grid-content" container direction="column" alignItems="center" style={{ height: 'auto', textAlign: 'center' }}>
              <Grid item>
                <icons.user color="#FF6500" size={48} /> {/* Icon */}
              </Grid>
              <Grid item>Kullanıcı İşlemleri</Grid>
            </Grid>
          </MainCard>
        </button>
      )}

      <Grid mt={3} width={'100%'}>
        <MainCard>
          <Grid item display={'flex'} justifyContent={'center'}>
            <Button sx={{ width: '100%' }} variant="contained" color="primary" onClick={handleChange}>
              Çıkış Yap
            </Button>
          </Grid>
        </MainCard>
      </Grid>
    </>
  );
}
