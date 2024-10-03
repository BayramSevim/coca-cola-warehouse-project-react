// material-ui
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Refresh } from 'iconsax-react';
import { useNavigate } from 'react-router';
import MasterDetail from '../../components/MasterDetail/MalzemeHareketleri/MasterDetail';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { GetWarehouseUrl } from 'api/gama';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// ==============================|| SAMPLE PAGE ||============================== //

const icons = {
  refresh: Refresh
};

export default function MalzemeHareketleri() {
  const appRef = useRef();

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());

  const [materialList, setMaterialList] = useState([]);
  const [makinaList, setMakinaList] = useState([]);
  const [rackList, setRackList] = useState([]);
  const [cellId, setCellId] = useState(0);
  const [makinaId, setMakinaId] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const navigate = useNavigate();
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  const handleOrientationChange = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };
  const getMaterial = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMaterial`)
      .then((res) => {
        setMaterialList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMakina = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMakinaList`)
      .then((res) => {
        setMakinaList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRack = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetRack`)
      .then((res) => {
        setRackList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };
  const handleRefresh = () => {
    if (appRef.current) {
      appRef.current.refreshData(); // App bileşenindeki refreshData fonksiyonunu çağır
    }
  };

  useEffect(() => {
    getMaterial();
    getMakina();
    getRack();
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);
  return (
    <div>
      <ToastContainer />

      {isLandscape ? (
        <Grid>
          <Grid>
            <Grid container rowSpacing={4.5} mt={-5} display={'flex'} justifyContent={'left'} columnSpacing={0.75}>
              <Grid item mb={-2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                      label="Başlangıç Tarihi"
                      select={selectedDateS}
                      defaultValue={dayjs(selectedDateS)}
                      onChange={handleDateChangeS}
                      format="DD.MM.YYYY HH:mm"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                      label="Bitiş Tarihi"
                      defaultValue={dayjs(selectedDateF)}
                      select={selectedDateF}
                      format="DD.MM.YYYY HH:mm"
                      onChange={handleDateChangeF}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item sx={{ width: '28%' }}>
                <Grid item mt={1}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={materialList}
                    getOptionLabel={(option) => `${option.code} / ${option.name}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setMaterialId(newValue.id);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Ürün Seçiniz" />}
                  />
                </Grid>
                <Grid item mt={2}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={makinaList}
                    getOptionLabel={(option) => `${option.name}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setMakinaId(newValue.id);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label="Makina Seçiniz" />}
                  />
                </Grid>
              </Grid>
              <Grid item mt={1} sx={{ width: '28%' }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={rackList}
                  getOptionLabel={(option) => `${option.rackName}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setCellId(newValue.cellId);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Raf Seçiniz" />}
                />
                <Button
                  onClick={handleRefresh}
                  sx={{
                    marginTop: '7%',
                    width: '100%',
                    color: 'yellow',
                    borderColor: 'yellow',
                    '&:hover': {
                      borderColor: 'yellow',
                      color: 'yellow'
                    },
                    '&.Mui-focused': {
                      color: 'yellow', // Aktif (focus) rengi
                      borderColor: 'yellow'
                    }
                  }}
                  variant="outlined"
                >
                  Getir
                </Button>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <MasterDetail
                  ref={appRef}
                  cellId={cellId}
                  dateS={selectedDateS}
                  dateF={selectedDateF}
                  makinaId={makinaId}
                  materialId={materialId}
                />
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
                  Raporu Görmek İçin Lütfen Telefonu Yan Çeviriniz
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
