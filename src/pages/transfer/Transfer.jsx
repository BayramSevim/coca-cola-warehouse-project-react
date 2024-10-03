import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { GetWarehouseUrl } from 'api/gama';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, ScanBarcode } from 'iconsax-react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import TransferTable from '../../components/table/TransferTable';

const icons = {
  camera: Camera,
  barcode: ScanBarcode
};

export default function MalKabul() {
  let scannerReadType = 0;
  const dataTableRef = useRef();

  const [scanner, setScanner] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [targetRack, setTargetRack] = useState([]);
  const [returnMaterialData, setReturnMaterialData] = useState([]);
  const [sourceRack, setSourceRack] = useState([]);
  const [scanResult, setScanResult] = useState('');
  const [materialBarcode, setMaterialBarcode] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [rackBarcode, setRackBarcode] = useState('');
  const [rackName, setRackName] = useState('');
  const [rackCode, setRackCode] = useState('');
  const [irsaliyeNo, setIrsaliyeNo] = useState('');
  const [adet, setAdet] = useState('');
  const [coment, setComment] = useState('');

  const [isTableVisible, setIsTableVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);

  const handleMaterialCheck = (event) => {
    setMaterialBarcode(event.target.value);
  };
  const handleRackCheck = (event) => {
    setRackBarcode(event.target.value);
  };
  const getSourceRackByBarcode = async (mBarcode) => {
    if (!mBarcode) return;
    try {
      await axios
        .get(`${GetWarehouseUrl()}/api/Warehouse/GetRackByBarcode`, {
          params: { barcode: mBarcode }
        })
        .then((res) => {
          if (res.data !== null) {
            if (res.data.rackId > 0) {
              setSourceRack(res.data);
              setMaterialName(res.data.rackName);
              setIsTableVisible(true);
            } else {
              toast.error('Ürün Bulunamadı.Hatalı Yada Tanımlanmamış Barkod');
            }
          }
        })
        .catch((err) => {
          toast.error('Server Connection Error');
        });
    } catch (err) {
      // console.log(err);
      toast.error('Server Not Defined', err);
    }
  };

  const getTargetRackByBarcode = async (rBarcode) => {
    if (!rBarcode) return;
    try {
      await axios
        .get(`${GetWarehouseUrl()}/api/Warehouse/GetRackByBarcode`, {
          params: { barcode: rBarcode }
        })
        .then((res) => {
          if (res.data !== null) {
            if (res.data.rackId > 0) {
              setTargetRack(res.data);
              setRackName(res.data.cellBarcode);
              setRackCode(res.data.rackName);
            } else {
              toast.error('Ürün Bulunamadı.Hatalı Yada Tanımlanmamış Barkod');
            }
          }
        })
        .catch((err) => {
          toast.error('Server Connection Error');
        });
    } catch (err) {
      // console.log(err);
      toast.error('Server Not Defined :', err);
    }
  };

  const SaveMaterial = async () => {
    try {
      await axios
        .post(
          `${GetWarehouseUrl()}/api/Warehouse/PostTransferMal`,
          [
            {
              id: 0,
              cellId: sourceRack.cellId,
              toCellId: 0,
              materialId: selectedMaterialId,
              progressTypeId: 0,
              actTypeId: 0,
              docNo: irsaliyeNo,
              quantity: adet,
              createdDate: '2024-08-16T11:35:37.265Z',
              isDeleted: false,
              comment: coment,
              comment1: '',
              comment2: ''
            },
            {
              id: 0,
              cellId: targetRack.cellId,
              toCellId: 0,
              materialId: selectedMaterialId,
              progressTypeId: 0,
              actTypeId: 0,
              docNo: irsaliyeNo,
              quantity: adet,
              createdDate: '2024-08-16T11:35:37.265Z',
              isDeleted: false,
              comment: coment,
              comment1: '',
              comment2: ''
            }
          ],
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          if (res.data !== null) {
            toast.success('Kayıt başarılı!');
            if (dataTableRef.current) {
              dataTableRef.current.getData(); // Child component'taki getData metodunu çağırıyoruz
            }
            setOpenSaveModal(false);
          } else {
            toast.error('Kayıt hatalı!');
            setOpenSaveModal(false);
          }
        })
        .catch((err) => {
          // console.error('Hata:', err);
          if (selectedMaterialId == null) {
            toast.error('Lütfen Raf Seçimi Yapınız.');
            setOpenSaveModal(false);
            return;
          }
          toast.error('İşlem Başarısız.');
          setOpenSaveModal(false);
        });
    } catch (error) {
      toast.error('Hata: ' + error.message);
    }
  };

  const getSourceRack = () => {
    scannerReadType = 1;
    // initiateScanner();
    handleOpenModal();
  };

  const getTargetRack = () => {
    scannerReadType = 2;
    // initiateScanner();
    handleOpenModal();
  };

  const initiateScanner = () => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 5, qrbox: { width: 400, height: 400 } });
    scanner.render(success, error);
    setScanner(scanner);

    function success(result) {
      if (scannerReadType === 1) {
        setMaterialBarcode(result);
        getSourceRackByBarcode(result);
        setOpenSaveModal(false);
      } else if ((scannerReadType = 2)) {
        setRackBarcode(result);
        getTargetRackByBarcode(result);
        setOpenSaveModal(false);
      }
      scanner.clear();
      setScanResult(result);
      setOpenModal(false);
    }

    function error(err) {
      console.log(err);
    }
  };

  const SelectedMaterialIdChange = (value) => {
    setSelectedMaterialId(value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setTimeout(() => {
      initiateScanner(); // Modal açıldığında tarayıcıyı başlatır
    }, 500); // 500ms gecikme ekleyin
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (scanner) {
      scanner.clear(); // Tarayıcıyı temizleyip durdurur
    }
  };

  const handleDataFetched = (fetchedData) => {
    setReturnMaterialData(fetchedData);
  };

  useEffect(() => {
    if (scanResult) {
      setScanResult('');
    }
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanResult]);

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <Grid mb={1}>
        <MainCard>
          <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    id="filled-basic"
                    sx={{ flexGrow: 1, marginRight: 2 }}
                    value={materialBarcode}
                    onChange={handleMaterialCheck}
                    InputProps={{ readOnly: true }}
                    label="Kaynak Raf Barkodu"
                    variant="filled"
                  />
                  {/* <Button variant="outlined" onClick={getUrun}> */}
                  <icons.barcode size={45} color="#f47373" onClick={getSourceRack} style={{ cursor: 'pointer' }} />
                  {/* </Button> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <MainCard>
        {isTableVisible ? (
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TransferTable
                ref={dataTableRef}
                barcode={materialBarcode}
                onDataFetched={handleDataFetched}
                onRowSelect={SelectedMaterialIdChange}
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                value={materialName}
                sx={{ width: '100%' }}
                InputProps={{ readOnly: true }}
                label="Ürün Adı"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
          <Grid item sx={{ width: '100%' }}>
            <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
              <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <TextField
                  id="filled-basic"
                  sx={{ flexGrow: 1, marginRight: 2 }}
                  value={rackBarcode}
                  onChange={handleRackCheck}
                  label="Hedef Raf Barkodu"
                  variant="filled"
                />

                <icons.barcode size={45} color="#f47373" onClick={getTargetRack} style={{ cursor: 'pointer' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                sx={{ width: '100%' }}
                value={rackName}
                InputProps={{ readOnly: true }}
                label="Raf Adı"
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
                value={rackCode}
                InputProps={{ readOnly: true }}
                label="Raf Kodu"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ display: 'none' }}>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <DemoContainer sx={{ width: '100%' }} components={['DatePicker', 'DatePicker']}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Tarih Seçiniz" />
                </LocalizationProvider>
              </DemoContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                id="filled-basic"
                sx={{ width: '100%' }}
                type="number"
                onChange={(e) => setAdet(e.target.value)}
                label="Adet"
                required
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
                onChange={(e) => setComment(e.target.value)}
                label="Açıklama"
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
                navigate('/dashboard');
              }}
            >
              Geri
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={() => setOpenSaveModal(true)}>
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </MainCard>

      {/* QR Kod Tarayıcı Modalı */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Kamera</DialogTitle>
        <DialogContent>
          <div id="reader" style={{ width: '100%', height: '15%' }}></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Kapat</Button>
        </DialogActions>
      </Dialog>

      {/*Save MODAL */}

      <Dialog open={openSaveModal} onClose={() => setOpenSaveModal(true)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '2px solid gray' }} mb={1}>
          Dikkat
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Kaynak Raf Seçimi :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{materialBarcode}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Ürün Adı :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{materialName}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Hedef Raf Barkodu :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{rackBarcode}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Raf Adı :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{rackName}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Raf Kodu :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{rackCode}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} mb={1.5}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Adet :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{adet}</label>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1}>
            <Grid item sx={{ color: '#3795BD', fontSize: '18px' }}>
              <label>Açıklama :</label>
            </Grid>
            <Grid item>
              <label style={{ fontSize: '18px' }}>{coment}</label>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={() => SaveMaterial()}>
            Kaydet
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpenSaveModal(false)}>
            İptal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
