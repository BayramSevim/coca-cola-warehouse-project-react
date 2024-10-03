// material-ui
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetWarehouseUrl, GetAPIUrl } from 'api/gama';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// ==============================|| SAMPLE PAGE ||============================== //

export default function RemoveUser() {
  const [malKabul, setMalKabul] = useState(false);
  const [malCikis, setMalCikis] = useState(false);
  const [rafIslemleri, setRafIslemleri] = useState(false);
  const [malzemeHareketleri, setMalzemeHareketleri] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [stokBilgilendirme, setStokBilgilendirme] = useState(false);
  const [kullaniciIslemleri, setKullaniciIslemleri] = useState(false);

  const [userList, setUserList] = useState([]);
  const [updateUser, setUpdateUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [userId, setUserId] = useState(0);

  const ActiveOrPassive = [
    { id: 1, name: 'Aktif', value: 1 },
    { id: 2, name: 'Pasif', value: 0 }
  ];
  const navigate = useNavigate();

  const getUserList = async () => {
    const response = await axios.get(`${GetWarehouseUrl()}/api/Auth/GetReportUserList`);
    setUserList(response.data);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const updateUserInfo = async (userName, password, isActive, userId) => {
    try {
      let active = false;
      if (isActive > 0) {
        active = true;
      } else {
        active = false;
      }
      const yetki = [
        malKabul ? '1,' : '0,',
        malCikis ? '1,' : '0,',
        rafIslemleri ? '1,' : '0,',
        malzemeHareketleri ? '1,' : '0,',
        transfer ? '1,' : '0,',
        stokBilgilendirme ? '1,' : '0,',
        kullaniciIslemleri ? '1' : '0'
      ].join('');

      await axios
        .post(
          `${GetWarehouseUrl()}/api/Auth/UpdateReportUser`,
          {
            id: userId,
            userName: userName,
            password: password,
            yetki: yetki,
            isActive: active
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          getUserList();
          setUpdateUser(res.data);
          if (updateUser !== null) {
            toast.success('Kullanıcı Güncellendi!');
          }
        })
        .catch((err) => {
          toast.error('Kullanıcı Güncellenemedi');
        });
    } catch (err) {
      console.log(err);
      toast.error('İşlem Hatalı!');
    }
  };

  const handleUserSelection = (newValue) => {
    if (newValue) {
      setUserId(newValue.id);
      setUserName(newValue.userName);
      setPassword(newValue.password);

      const yetkiArray = newValue.yetki.split(',');

      setMalKabul(yetkiArray[0] === '1');
      setMalCikis(yetkiArray[1] === '1');
      setRafIslemleri(yetkiArray[2] === '1');
      setMalzemeHareketleri(yetkiArray[3] === '1');
      setTransfer(yetkiArray[4] === '1');
      setStokBilgilendirme(yetkiArray[5] === '1');
      setKullaniciIslemleri(yetkiArray[6] === '1');

      setIsActive(newValue.isActive ? 1 : 0);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={userList}
            getOptionLabel={(option) => `${option.userName}`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              handleUserSelection(newValue);
            }}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Kullanıcı Seçiniz" />}
          />
        </Grid>
      </Grid>
      <MainCard>
        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ width: '100%' }}
                label="Kullanıcı Adı"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1.2} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
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

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <FormControl fullWidth className="form-control">
                <InputLabel id="demo-simple-select-label">Durum</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  onChange={(e) => {
                    setIsActive(e.target.value);
                  }}
                  value={isActive}
                  id="demo-simple-select"
                >
                  {ActiveOrPassive.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid mb={1}>
          <MainCard>
            <Grid>
              <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <Typography textAlign={'center'} mb={2} borderBottom={1} color={'yellow'}>
                    Yetkilendirme
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={malKabul} onChange={(e) => setMalKabul(e.target.checked)} />}
                      label="Malzeme Kabul"
                    />
                    <FormControlLabel
                      control={<Switch checked={malCikis} onChange={(e) => setMalCikis(e.target.checked)} />}
                      label="Malzeme Çıkış"
                    />
                    <FormControlLabel
                      control={<Switch checked={rafIslemleri} onChange={(e) => setRafIslemleri(e.target.checked)} />}
                      label="Raf İşlemleri"
                    />
                    <FormControlLabel
                      control={<Switch checked={malzemeHareketleri} onChange={(e) => setMalzemeHareketleri(e.target.checked)} />}
                      label="Malzeme Hareketleri"
                    />
                    <FormControlLabel
                      control={<Switch checked={transfer} onChange={(e) => setTransfer(e.target.checked)} />}
                      label="Transfer"
                    />
                    <FormControlLabel
                      control={<Switch checked={stokBilgilendirme} onChange={(e) => setStokBilgilendirme(e.target.checked)} />}
                      label="Stok Bilgilendirme"
                    />
                    <FormControlLabel
                      control={<Switch checked={kullaniciIslemleri} onChange={(e) => setKullaniciIslemleri(e.target.checked)} />}
                      label="Kullanıcı İşlemleri"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

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
            <Button variant="contained" color="success" onClick={() => updateUserInfo(userName, password, isActive, userId)}>
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </MainCard>
    </div>
  );
}
