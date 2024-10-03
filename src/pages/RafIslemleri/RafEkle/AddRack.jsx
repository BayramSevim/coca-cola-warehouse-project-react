import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GetWarehouseUrl } from 'api/gama';
import { toast, ToastContainer } from 'react-toastify';
import { Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import MatchedRacksTable from '../../../components/table/MatchedRacksTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function RemoveUser() {
  const navigate = useNavigate();
  const [materialList, setMaterialList] = useState([]);
  const [rackForMatMatch, setRackForMatMatch] = useState([]);
  const [cellId, setCellId] = useState(0);
  const [selectedTable, setSelectedTable] = useState(null);
  const [materialId, setMaterialId] = useState(0);
  const dataTableRef = useRef();

  const getMaterial = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMaterial`)
      .then((res) => {
        if (res.data !== null) {
          setMaterialList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRackForMatMatch = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetRackForMatMatch`)
      .then((res) => {
        if (res.data !== null) {
          setRackForMatMatch(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postUpdateCellForMaterial = async (cellId) => {
    const data = {
      rackId: 0,
      floorId: 0,
      cellId: cellId,
      rackName: '',
      quantity: 0,
      cellBarcode: '',
      materialId: materialId,
      materialName: '',
      materialCode: ''
    };
    await axios
      .post(`${GetWarehouseUrl()}/api/Warehouse/PostUpdateCellForMaterial`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data !== null) {
          toast.success('Raf Eşleme Başarılı!');
          if (dataTableRef.current) {
            dataTableRef.current.getMatchedRacks(); // Child component'taki getData metodunu çağırıyoruz
          }
          getRackForMatMatch();
        } else {
          toast.error('Mal Çıkış Başarılı!');
          setOpenSaveModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('İstek Atılamadı.');
      });
  };

  const postDeleteCellForMaterial = async (cellId, materialId) => {
    const data = {
      rackId: 0,
      floorId: 0,
      cellId: cellId,
      rackName: '',
      quantity: 0,
      cellBarcode: '',
      materialId: materialId,
      materialName: '',
      materialCode: ''
    };
    await axios
      .post(`${GetWarehouseUrl()}/api/Warehouse/PostDeleteCellForMaterial`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data !== null) {
          toast.success('Raf Silme İşlemi Başarılı!');
          if (dataTableRef.current) {
            dataTableRef.current.getMatchedRacks(); // Child component'taki getData metodunu çağırıyoruz
          }
        } else {
          toast.error('Raf Silme İşlemi Başarısız!');
          setOpenSaveModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('İstek Atılamadı.');
      });
  };

  const handleRowSelected = (row) => {
    setSelectedTable(row);
  };

  useEffect(() => {
    getRackForMatMatch();
    getMaterial();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={materialList}
                getOptionLabel={(option) => `${option.code} / ${option.name}`}
                sx={{ width: '100%' }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setMaterialId(newValue.id);
                  } else {
                    console.log('Seçim temizlendi');
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Ürün Seçiniz" />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rackForMatMatch}
                getOptionLabel={(option) => option.rackName}
                onChange={(event, newValue) => {
                  setCellId(newValue.cellId);
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Raf Seçiniz" />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid mb={1}>
        <MainCard>
          <MatchedRacksTable onRowSelected={handleRowSelected} ref={dataTableRef} />
          <Grid mt={1} container display="flex" justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: 'white' }}
                onClick={() => postDeleteCellForMaterial(selectedTable.cellId, selectedTable.materialId)}
              >
                Eşleşmeyi Sil
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={4.75}>
        <Grid item>
          <Button
            variant="contained"
            sx={{ color: 'white' }}
            color="error"
            onClick={() => {
              navigate('/depo/raf-islemleri');
            }}
          >
            Geri
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ color: 'white' }} color="success" onClick={() => postUpdateCellForMaterial(cellId)}>
            Raf Eşle
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
