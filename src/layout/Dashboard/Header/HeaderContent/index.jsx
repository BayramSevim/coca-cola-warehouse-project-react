import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project-imports
import Search from './Search';
import Message from './Message';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import FullScreen from './FullScreen';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from 'components/@extended/IconButton';
import { Logout } from 'iconsax-react';
import ListItemIcon from '@mui/material/ListItemIcon';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import useAuth from 'hooks/useAuth';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* {!downLG && <Search />} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      <FullScreen />
      {/* <Message /> */}
      {/* {!downLG && <Profile />} */}
      <Grid item>
        <Tooltip title="Logout">
          <IconButton size="large" color="error" sx={{ p: 1 }} onClick={handleLogout}>
            <ListItemIcon>
              <Logout variant="Bulk" size={18} />
            </ListItemIcon>
          </IconButton>
        </Tooltip>
      </Grid>
      {downLG && <MobileSection />}
    </>
  );
}
