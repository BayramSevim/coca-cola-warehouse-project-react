import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { fetcher } from 'utils/axios';

import axios from 'axios';
import { GetWarehouseUrl } from 'api/gama';

// assets
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ forgot }) {
  const { isLoggedIn, login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);
  const [password, setPassword] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await login(userName, password);
      setIsLoginError(false);
      navigate('/dashboard');
    } catch (e) {
      setIsLoginError(true);
    }
  };
  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {isLoginError && (
              <Grid item mb={2} textAlign={'center'}>
                <FormHelperText
                  error
                  style={{
                    fontSize: '14px',
                    textAlign: 'center',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px'
                  }}
                >
                  Hatalı kullanıcı adı veya şifre girişi!
                </FormHelperText>
              </Grid>
            )}
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Kullanıcı Adı</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={userName}
                name="email"
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Şifre</InputLabel>
              <OutlinedInput
                fullWidth
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    fetchUser();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button onClick={fetchUser} disableElevation fullWidth size="large" type="button" variant="contained" color="primary">
                Giriş Yap
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
