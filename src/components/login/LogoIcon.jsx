// material-ui
import { useTheme } from '@mui/material/styles';
import Logo from '../../assets/images/Logo/GamaLogoBlack.png';

export default function LogoIcon() {
  const theme = useTheme();

  return <img src={Logo} alt="" width={300} style={{ margin: '0px 66px 0px -10px' }} />;
}
