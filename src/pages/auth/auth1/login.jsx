// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import Logo from 'components/login';

import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// assets

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <AuthLogin forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
