import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { GetWarehouseUrl } from 'api/gama';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, ScanBarcode, TickCircle, CloseCircle, Add, Danger, InfoCircle } from 'iconsax-react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const icons = {
  camera: Camera,
  barcode: ScanBarcode,
  tick: TickCircle,
  close: CloseCircle,
  add: Add,
  danger: Danger,
  info: InfoCircle
};

export default function MalCikis() {
  const navigate = useNavigate();
  let scannerReadType = 0;

  // MATERIAL
  const [materialBarcode, setMaterialBarcode] = useState('');
  const [materialId, setMaterialId] = useState(0);
  const [materialResult, setMaterialResult] = useState([]);
  const [sicilBarcode, setSicilBarcode] = useState('');

  // CAMERA
  const [scanner, setScanner] = useState(null);
  const [scanResult, setScanResult] = useState('');

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openCriticalStock, setOpenCriticalStock] = useState(false);
  const [cards, setCards] = useState([]);

  // GET DATA
  const getMaterialByBarcode = async (mBarcode) => {
    if (!mBarcode) return;
    try {
      await axios
        .get(`${GetWarehouseUrl()}/api/Warehouse/GetMaterialByBarcode`, {
          params: {
            barcode: mBarcode
          }
        })
        .then((res) => {
          setMaterialId(res.data.id);
          if (res.data.id > 0) {
            handleAddCard(res.data.id, res.data.cellId, res.data.code, res.data.rackName);
            handleCardChange(res.data.id, 'barcode', mBarcode);
            handleCardChange(res.data.id, 'rackBarcode', res.data.rackName);
          } else {
            toast.error('Yanlış Ürün Okuttunuz');
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Server Connection Error');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const SaveMaterial = async () => {
    try {
      const data = [];
      cards.map((card) => {
        const tempData = {
          id: 0,
          cellId: card.cellId,
          machineId: 0,
          toCellId: 0,
          materialId: card.id, //Karttaki materialId
          progressTypeId: 0,
          actTypeId: 0,
          docNo: '',
          quantity: parseInt(card.cardQuantity),
          createdDate: '2024-08-16T11:35:37.265Z',
          isDeleted: false,
          comment: card.cardComment,
          comment1: '',
          comment2: ''
        };
        data.push(tempData);
      });
      await axios
        .post(`${GetWarehouseUrl()}/api/Warehouse/PostInsertMalKabul`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.data !== null) {
            setMaterialResult(res.data);
            toast.success('Kayıt başarılı!');
            setOpenSaveModal(false);
            setOpenCriticalStock(true);
          } else {
            toast.error('Kayıt hatalı!');
            setOpenSaveModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('İstek Atılamadı.');
          setOpenSaveModal(false);
        });
    } catch (error) {
      // toast.error('Servera bağlanılamıyor: ' + error.message);
      console.log(error.message);
    }
  };

  const initiateScanner = () => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 5, qrbox: { width: 400, height: 400 } });
    scanner.render(success, error);
    setScanner(scanner);

    function success(result) {
      if (scannerReadType === 1) {
        getMaterialByBarcode(result);
        setMaterialBarcode(result);
      } else if (scannerReadType === 2) {
        setSicilBarcode(result);
      }
      scanner.clear();
      setScanResult(result);
      setOpenModal(false); // Modalı kapat
    }

    function error(err) {
      // console.log(err);
    }
  };

  const getUrun = () => {
    scannerReadType = 1;
    setOpenModal(true);
    setTimeout(() => {
      initiateScanner();
    }, 500);
  };
  const getSicil = () => {
    scannerReadType = 2;
    setOpenModal(true);
    setTimeout(() => {
      initiateScanner(0);
    }, 500);
  };

  const handleAddCard = (matId, cellId, barcode, rackBarcode) => {
    const existingCard = cards.find((card) => card.id === matId);
    if (existingCard) {
      toast.error('Bu Ürün Zaten Eklenmiş');
    } else {
      setCards((prevCards) => [
        ...prevCards,
        {
          id: matId,
          cellId: cellId,
          code: '',
          barcode: barcode,
          cardQuantity: '',
          cardComment: '',
          rackBarcode: rackBarcode,
          cardFatura: ''
        }
      ]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (scanner) {
      scanner.clear(); // Tarayıcıyı temizleyip durdurur
    }
  };
  const handleCardChange = (id, field, value) => {
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, [field]: value } : card)));
  };
  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const areAllFieldsFilled = () => {
    return cards.every((card) => card.rackName !== null && card.cardQuantity > 0 && card.cardFatura !== null && card.cardComment !== null);
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

  return (
    <>
      <ToastContainer />
      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1.8} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TextField
                id="filled-basic"
                sx={{ flexGrow: 1, marginRight: 1 }}
                value={sicilBarcode}
                InputProps={{ readOnly: true }}
                label="Sicil No"
                variant="filled"
              />
              <icons.barcode size={45} onClick={getSicil} color="#f47373" style={{ cursor: 'pointer' }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1.8} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TextField
                id="filled-basic"
                sx={{ flexGrow: 1, marginRight: 1 }}
                value={materialBarcode}
                InputProps={{ readOnly: true }}
                label="Ürün Barkodu"
                variant="filled"
              />
              <Button variant="outlined" color="success" onClick={getUrun} sx={{ width: '30%' }}>
                EKLE
                <icons.barcode size={23} style={{ marginLeft: '5%' }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {cards.map((card) => {
        return (
          <Grid
            item
            xs={12}
            sm={4}
            mt={1}
            key={card.id}
            sx={(theme) => ({
              border:
                card.rackName !== null && card.cardQuantity > 0 && card.cardFatura !== ''
                  ? '3px solid lime' // Tüm alanlar doluysa
                  : '3px solid red', // En az bir alan boşsa
              borderRadius: '10px'
            })}
          >
            <MainCard>
              <Grid container display={'flex'} justifyContent={'center'} columnSpacing={20}>
                <Grid
                  item
                  mt={-2.5}
                  display={card.rackName !== null && card.cardQuantity > 0 && card.cardFatura !== '' ? 'inherit' : 'none'}
                >
                  <icons.tick size={32} color="lime" />
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ borderBottom: '1px solid darkgray' }} mb={1} display={'flex'} justifyContent={'center'}>
                    Ürün Barkodu : {<div style={{ color: 'yellow', paddingLeft: '10px' }}>{card.barcode}</div>}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                    <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <TextField
                        id="filled-basic"
                        sx={{ flexGrow: 1, marginRight: 1 }}
                        value={card.rackBarcode}
                        InputProps={{ readOnly: true }}
                        label="Raf Bilgisi"
                        size="small"
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                    <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <TextField
                        id="filled-basic"
                        sx={{
                          flexGrow: 1,
                          marginRight: 0.7
                        }}
                        onChange={(e) => {
                          handleCardChange(card.id, 'cardQuantity', e.target.value);
                        }}
                        label="Eklenecek Adet"
                        value={card.cardQuantity}
                        size="small"
                        variant="filled"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="filled-basic"
                    sx={{ width: '100%' }}
                    // value={card.cardFatura}
                    // multiline="1"
                    size="small"
                    style={{ padding: '1px' }}
                    onChange={(e) => {
                      handleCardChange(card.id, 'cardFatura', e.target.value);
                    }}
                    label="Fatura / İrsaliye No"
                    variant="filled"
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <TextField
                    id="filled-basic"
                    sx={{ width: '100%' }}
                    // value={card.cardComment}
                    // multiline="1"
                    size="small"
                    style={{ padding: '1px' }}
                    onChange={(e) => {
                      const findComment = cards.find((card) => card.id == materialId);
                      if (findComment) {
                        findComment.comment = e.target.value;
                        handleCardChange(card.id, 'cardComment', findComment.comment);
                      }
                    }}
                    label="Açıklama"
                    variant="filled"
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} display={'flex'} justifyContent={'end'} columnSpacing={3.75}>
                <Grid item>
                  <Button variant="contained" color="error" onClick={() => handleDeleteCard(card.id)}>
                    Sil
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        );
      })}
      <Grid container display={'flex'} mt={1} justifyContent={'center'}>
        <Grid item ml={1}>
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

        {cards.length > 0 && (
          <Grid item ml={1}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              color="success"
              onClick={() => {
                if (areAllFieldsFilled()) {
                  setOpenSaveModal(true);
                } else {
                  toast.error('Lütfen Tüm Alanları Doldurunuz');
                }
              }}
            >
              Kaydet
            </Button>
          </Grid>
        )}
      </Grid>

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

      {/* Save Modal */}

      <Dialog open={openSaveModal} onClose={() => setOpenSaveModal(true)} maxWidth="sm" fullWidth>
        <DialogTitle mb={-1}>
          <Grid container display={'flex'} justifyContent={'center'}>
            <Grid item mt={0.5} mr={1}>
              Bilgilendirme
            </Grid>
            <Grid item>
              <icons.info size={32} color="#dce775" />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {cards.map((card) => {
            return (
              <Grid
                key={card.id}
                sx={{
                  border: '2px solid #295F98',
                  boxShadow: '2px 2px 2px black',
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: 1
                }}
              >
                <Grid
                  container
                  display={'flex'}
                  sx={{ backgroundColor: '#DC6B19' }}
                  borderRadius={2}
                  marginBottom={1}
                  justifyContent={'center'}
                  fontSize={16}
                >
                  <Grid item>
                    <label>{card.name}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Raf Bilgisi :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.rackBarcode}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>İstenen Adet :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.cardQuantity}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Fatura / İrsaliye No :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.cardFatura}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Açıklama :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.comment}</label>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </DialogContent>
        <DialogActions sx={{ marginTop: '-6%' }}>
          <Button variant="contained" color="success" onClick={() => SaveMaterial()}>
            Kaydet
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpenSaveModal(false)}>
            İptal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Kritik Stok Modal */}
      <Dialog open={openCriticalStock} onClose={() => setOpenCriticalStock(true)} maxWidth="sm" fullWidth>
        <DialogTitle>Stok Bilgilendirme</DialogTitle>
        <DialogContent>
          {materialResult.map((mat) => (
            <Grid
              key={mat.id}
              container
              display={'flex'}
              sx={{ border: '1px solid orange', padding: '6%', borderRadius: '10px', marginBottom: '2%' }}
              alignItems={'center'}
              justifyContent={'end'}
            >
              <Grid container columnSpacing={1}>
                <Grid item>
                  <Typography fontSize={16}>
                    <span style={{ color: 'yellow' }}>
                      {mat.code} / {mat.name}
                    </span>{' '}
                    'in güncel stok miktarı : <span style={{ color: 'yellow' }}>{mat.quantity}</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{ marginTop: '-8%' }} onClick={() => navigate('/dashboard')}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
