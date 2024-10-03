// material-ui

import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetWarehouseUrl } from 'api/gama';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

export default function AddUser() {
  const [malKabul, setMalKabul] = useState(false);
  const [malCikis, setMalCikis] = useState(false);
  const [rafIslemleri, setRafIslemleri] = useState(false);
  const [malzemeHareketleri, setMalzemeHareketleri] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [stokBilgilendirme, setStokBilgilendirme] = useState(false);
  const [kullaniciIslemleri, setKullaniciIslemleri] = useState(false);

  const [insertUser, setInsertUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const updateUserInfo = async (userName, password) => {
    try {
      const yetki = [
        malKabul ? '1,' : '0,',
        malCikis ? '1,' : '0,',
        rafIslemleri ? '1,' : '0,',
        malzemeHareketleri ? '1,' : '0,',
        transfer ? '1,' : '0,',
        stokBilgilendirme ? '1,' : '0,',
        kullaniciIslemleri ? '1' : '0'
      ].join('');

      const response = await axios.post(
        `${GetWarehouseUrl()}/api/Auth/InsertReportUser`,
        {
          id: 0,
          userName: userName,
          password: password,
          yetki: yetki,
          isActive: true
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setInsertUser(response.data);
      if (insertUser !== null) {
        toast.success('Kullanıcı Eklendi!');
      }
    } catch (err) {
      console.log(err);
      toast.error('Kullanıcı Eklenemedi!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <MainCard>
        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                sx={{ width: '100%' }}
                label="Kullanıcı Adı"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                sx={{ width: '100%' }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Şifre"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <MainCard>
          <Grid>
            <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
              <Grid item sx={{ width: '100%' }}>
                <Typography textAlign={'center'} mb={2} borderBottom={1} color={'yellow'}>
                  Yetkilendirme
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Switch onChange={(e) => setMalKabul(e.target.checked)} />} label="Malzeme Kabul" />
                  <FormControlLabel control={<Switch onChange={(e) => setMalCikis(e.target.checked)} />} label="Malzeme Çıkış" />
                  <FormControlLabel control={<Switch onChange={(e) => setRafIslemleri(e.target.checked)} />} label="Raf İşlemleri" />
                  <FormControlLabel
                    control={<Switch onChange={(e) => setMalzemeHareketleri(e.target.checked)} />}
                    label="Malzeme Hareketleri"
                  />
                  <FormControlLabel control={<Switch onChange={(e) => setTransfer(e.target.checked)} />} label="Transfer" />
                  <FormControlLabel
                    control={<Switch onChange={(e) => setStokBilgilendirme(e.target.checked)} />}
                    label="Stok Bilgilendirme"
                  />
                  <FormControlLabel
                    control={<Switch onChange={(e) => setKullaniciIslemleri(e.target.checked)} />}
                    label="Kullanıcı İşlemleri"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>

        <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/depo/kullanici-islemleri');
              }}
            >
              Geri
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={() => updateUserInfo(userName, password)}>
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </MainCard>
    </div>
  );
}
