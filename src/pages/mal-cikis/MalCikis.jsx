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
import Autocomplete from '@mui/material/Autocomplete';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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

  // RACK
  const [rackName, setRackName] = useState('');

  // MATERIAL
  const [sicilBarcode, setSicilBarcode] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [materialCode, setMaterialCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [materialId, setMaterialId] = useState(0);
  const [cellId, setCellId] = useState(0);
  const [materialList, setMaterialList] = useState([]);
  const [materialBarcodeList, setMaterialBarcodeList] = useState([]);
  const [hatList, setHatList] = useState([]);
  const [kisimList, setKisimList] = useState([]);
  const [makinaList, setMakinaList] = useState([]);

  // CAMERA
  const [scanner, setScanner] = useState(null);
  const [scanResult, setScanResult] = useState('');

  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [cards, setCards] = useState([]);

  // GET DATA
  const getMaterialByBarcode = async (mBarcode, cardId) => {
    if (!mBarcode) return;
    try {
      await axios
        .get(`${GetWarehouseUrl()}/api/Warehouse/GetMaterialByBarcode`, {
          params: {
            barcode: mBarcode
          }
        })
        .then((res) => {
          if (res.data.id !== cardId) {
            toast.error('Yanlış Ürün Okuttunuz');
          } else {
            handleCardChange(cardId, 'barcode', mBarcode);
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
          toast.error('Server Connection Error');
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getMaterial = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMaterial`)
      .then((res) => {
        if (res.data != null) {
          setMaterialList(res.data);
        }
      })
      .catch((err) => {
        toast.error("Server'a Bağlanılamadı");
      });
  };
  const getHat = async () => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetHat`)
      .then((res) => {
        if (res.data != null) {
          setHatList(res.data);
        }
      })
      .catch((err) => {
        toast.error("Server'a Bağlanılamadı");
      });
  };
  const getKisim = async (id) => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetKisim`, {
        params: {
          hatId: id
        }
      })
      .then((res) => {
        if (res.data != null) {
          setKisimList(res.data);
        }
      })
      .catch((err) => {
        toast.error("Server'a Bağlanılamadı");
      });
  };
  const getMakina = async (id) => {
    await axios
      .get(`${GetWarehouseUrl()}/api/Warehouse/GetMakinaByKisimId`, {
        params: {
          kisimId: id
        }
      })
      .then((res) => {
        if (res.data != null) {
          setMakinaList(res.data);
        }
      })
      .catch((err) => {
        toast.error("Server'a Bağlanılamadı");
      });
  };
  const SaveMaterial = async () => {
    try {
      const data = [];
      cards.map((card) => {
        const tempData = {
          id: 0,
          cellId: card.cellId,
          machineId: card.machineId,
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
        .post(`${GetWarehouseUrl()}/api/Warehouse/PostInsertMalCikis`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.data !== null) {
            setMaterialBarcodeList(res.data);
            toast.success('Mal Çıkış Başarılı!');
            setOpenSaveModal(false);
            getMaterial();
            setOpenInfoModal(true);
          } else {
            toast.error('Mal Çıkış Başarılı!');
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

  const initiateScanner = (cardId) => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 5, qrbox: { width: 400, height: 400 } });
    scanner.render(success, error);
    setScanner(scanner);

    function success(result) {
      if (scannerReadType === 1) {
        getMaterialByBarcode(result, cardId);
      } else if (scannerReadType === 2) {
        setSicilBarcode(result);
        getMaterial();
        getHat();
      }
      scanner.clear();
      setScanResult(result);
      setOpenModal(false); // Modalı kapat
    }

    function error(err) {
      // console.log(err);
    }
  };

  const getUrun = (cardId) => {
    scannerReadType = 1;
    setOpenModal(true);
    setTimeout(() => {
      initiateScanner(cardId);
    }, 500);
  };

  const getSicil = () => {
    scannerReadType = 2;
    setOpenModal(true);
    setTimeout(() => {
      initiateScanner(0);
    }, 500);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (scanner) {
      scanner.clear(); // Tarayıcıyı temizleyip durdurur
    }
  };

  const handleAddCard = () => {
    if (materialId <= 0) {
      toast.error('Ürün Seçimi Yapınız');
      return;
    }
    const existingCard = cards.find((card) => card.id === materialId);
    if (existingCard) {
      toast.error('Bu ürün zaten eklenmiş.');
    } else {
      setCards((prevCards) => [
        ...prevCards,
        {
          id: materialId,
          cellId: cellId,
          rackName: 'R1',
          name: materialName,
          code: materialCode,
          machineId: '',
          hat: '',
          kisim: '',
          makina: '',
          cardQuantity: '',
          cardComment: '',
          barcode: ''
        }
      ]);

      setRackName('R1');
    }
  };
  const handleCardChange = (id, field, value) => {
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, [field]: value } : card)));
  };
  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const areAllFieldsFilled = () => {
    return cards.every(
      (card) =>
        card.rackName !== '' &&
        card.cardQuantity > 0 &&
        card.hat !== null &&
        card.kisim !== null &&
        card.makina !== null &&
        card.barcode !== ''
    );
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
      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
            <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={materialList}
                getOptionLabel={(option) => `${option.code} / ${option.name}`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setMaterialName(newValue.name);
                    setMaterialCode(newValue.code);
                    setMaterialId(newValue.id);
                    setCellId(newValue.cellId);
                  } else {
                    console.log('Seçim temizlendi');
                  }
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Ürün Seçiniz" />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
        <Grid item sx={{ width: '100%' }}>
          <Grid container display={'flex'} justifyContent={'end'}>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="outlined" color="success" onClick={handleAddCard} sx={{ width: '100%' }}>
                EKLE
                <icons.add size={23} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {cards.map((card) => {
        const material = materialList.find((item) => item.id === card.id);
        return (
          <Grid
            item
            xs={12}
            sm={4}
            mt={1}
            key={card.id}
            sx={(theme) => ({
              border:
                card.rackName && card.cardQuantity > 0 && card.hat && card.kisim && card.makina && card.barcode !== ''
                  ? '3px solid green' // Tüm alanlar doluysa
                  : '3px solid red', // En az bir alan boşsa
              borderRadius: '10px'
            })}
          >
            <MainCard>
              <Grid container display={'flex'} justifyContent={'center'} columnSpacing={20}>
                <Grid
                  item
                  mt={-2.5}
                  display={
                    card.rackName && card.cardQuantity > 0 && card.hat && card.kisim && card.makina && card.barcode !== ''
                      ? 'inherit'
                      : 'none'
                  }
                >
                  <icons.tick size={32} color="lime" />
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ borderBottom: '1px solid darkgray' }} mb={1} display={'flex'} justifyContent={'center'}>
                    {card.code} / {card.name}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} marginBottom={1} display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    id="filled-basic"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                    value={card.barcode || ''}
                    InputProps={{ readOnly: true }}
                    label="Ürün Barkodu"
                    variant="filled"
                    size="small"
                    style={{ padding: '1px' }}
                  />
                  <icons.barcode
                    size={45}
                    onClick={() => {
                      getUrun(card.id);
                    }}
                    color="#f47373"
                    style={{ cursor: 'pointer' }}
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                    <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <TextField
                        id="filled-basic"
                        sx={{ flexGrow: 1, marginRight: 1 }}
                        value={rackName}
                        InputProps={{ readOnly: true }}
                        label="Raf Bilgisi"
                        variant="filled"
                      />
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
                        sx={{
                          flexGrow: 1,
                          marginRight: 0.7,
                          '& .MuiFilledInput-root::after ': {
                            borderColor: card.cardQuantity > material.quantity ? 'red' : 'inherit'
                          },
                          '& .MuiFormLabel-root': {
                            color: card.cardQuantity > material.quantity ? 'red' : 'inherit'
                          }
                        }}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          handleCardChange(card.id, 'cardQuantity', e.target.value);
                        }}
                        label="İstenen Adet"
                        value={card.cardQuantity}
                        variant="filled"
                      />
                      <span> / </span>
                      <Typography ml={1} fontWeight={'bold'} fontSize={15}>
                        {material.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container rowSpacing={4.5} display={'flex'} marginBottom={1.8} justifyContent={'center'} columnSpacing={2.75}>
                <Grid item sx={{ width: '100%' }}>
                  <Grid container display={'flex'} justifyContent={'center'} columnSpacing={2.75}>
                    <Grid item sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={hatList}
                        size="small"
                        getOptionLabel={(option) => `${option.code} / ${option.name}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            getKisim(newValue.id);
                            handleCardChange(card.id, 'hat', newValue.name);
                          }
                        }}
                        sx={{ width: '100%', marginRight: 1 }}
                        renderInput={(params) => <TextField {...params} label="Hat Seçiniz" />}
                      />
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={kisimList}
                        size="small"
                        getOptionLabel={(option) => `${option.code} / ${option.name}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            getMakina(newValue.id);
                            handleCardChange(card.id, 'kisim', newValue.name);
                          }
                        }}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Kısım Seçiniz" />}
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
                        options={makinaList}
                        size="small"
                        getOptionLabel={(option) => `${option.code} / ${option.name}`}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            handleCardChange(card.id, 'machineId', newValue.id);
                            handleCardChange(card.id, 'makina', newValue.name);
                          }
                        }}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Makina Seçiniz" />}
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
                    // value={card.cardComment}
                    // multiline="1"
                    size="small"
                    style={{ padding: '1px' }}
                    onChange={(e) => {
                      const findComment = cards.find((card) => card.id == materialId);
                      if (findComment) {
                        findComment.cardComment = e.target.value;
                        handleCardChange(card.id, 'cardComment', findComment.cardComment);
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
                    <label>{card.rackName}</label>
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
                    <label>Hat Seçimi :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.hat}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Kısım Seçimi :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.kisim}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Makina Seçimi :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.makina}</label>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={1}>
                  <Grid item sx={{ color: '#3795BD' }}>
                    <label>Açıklama :</label>
                  </Grid>
                  <Grid item>
                    <label>{card.cardComment}</label>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
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

      {/* Bilgilendirme Modal */}
      <Dialog open={openInfoModal} onClose={() => setOpenInfoModal(true)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Grid container display={'flex'} columnSpacing={1} justifyContent={'center'}>
            <Grid item mt={0.5}>
              Genel Bilgilendirme
            </Grid>
            <Grid item>
              <icons.info size={32} color="yellow" />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ marginBottom: '-6%' }}>
          {materialBarcodeList.map((card) => (
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'end'}>
              <Grid container columnSpacing={1}>
                <Grid item>
                  <Grid
                    sx={{
                      border: '2px solid #295F98',
                      boxShadow: '2px 2px 2px black',
                      padding: '10px',
                      borderRadius: '10px',
                      marginBottom: 1
                    }}
                  >
                    <span style={{ color: 'yellow' }}>{card.code} / </span>
                    <span style={{ color: 'yellow' }}>{card.name}</span> 'den <span style={{ color: 'yellow' }}>{card.quantity}</span> Adet
                    Stok Kalmıştır. Kritik Stok Miktarı <span style={{ color: 'yellow' }}>{card.criticalStock}</span> Adettir.
                    {card.quantity <= card.criticalStock && (
                      <div>
                        Stok Miktarı <span style={{ color: 'red' }}>Kritik Stok Miktarı</span>'nın Altına Düşmüştür.İlgili Birimlere Mail
                        Gönderildi{' '}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/dashboard')}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
