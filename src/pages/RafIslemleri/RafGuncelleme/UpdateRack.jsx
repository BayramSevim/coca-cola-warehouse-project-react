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

// ==============================|| SAMPLE PAGE ||============================== //

export default function RemoveUser() {
  // const [activePassive, setActivePassive] = useState(1);
  const [rackList, setRackList] = useState([]);
  const [updateUser, setUpdateUser] = useState([]);
  const [rackName, setRackName] = useState('');
  const [cellBarcode, setCellBarcode] = useState('');
  const [rackId, setRackId] = useState(0);

  const navigate = useNavigate();

  const getUserList = async () => {
    const response = await axios.get(`${GetWarehouseUrl()}/api/Warehouse/GetRack`);
    setRackList(response.data);
  };
  useEffect(() => {
    getUserList();
  }, []);

  const getRackById = (value) => {
    const tempRack = rackList.find((rack) => rack.cellId === value);
    if (tempRack) {
      setRackName(tempRack.rackName);
      setCellBarcode(tempRack.cellBarcode);
      setRackId(tempRack.cellId);
    }
  };
  // const updateUserInfo = async (userName, password, isActive, userId) => {
  //   try {
  //     let active = false;
  //     if (isActive > 0) {
  //       active = true;
  //     } else {
  //       active = false;
  //     }
  //     const response = await axios.post(
  //       `${GetWarehouseUrl()}/api/Auth/UpdateReportUser?uName=${userName}&uPass=${password}&id=${userId}&isActive=${active}`
  //     );
  //     setUpdateUser(response.data);
  //     if (updateUser !== null) {
  //       toast.success('Kullanıcı Güncellendi!');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error('Kullanıcı Güncellenemedi!');
  //   }
  // };

  return (
    <div>
      <ToastContainer />
      <Grid container rowSpacing={4.5} marginBottom={5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Raf Seçimi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={rackId || ''}
              onChange={(e) => getRackById(e.target.value)}
              id="demo-simple-select"
            >
              {rackList.map((item) => (
                <MenuItem key={item.cellId} value={item.cellId}>
                  {item.rackName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <MainCard>
        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                onChange={(e) => setRackName(e.target.value)}
                value={rackName}
                sx={{ width: '100%' }}
                label="Raf Adı"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                sx={{ width: '100%' }}
                onChange={(e) => setCellBarcode(e.target.value)}
                value={cellBarcode}
                label="Raf Barkodu"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/depo/raf-islemleri');
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
