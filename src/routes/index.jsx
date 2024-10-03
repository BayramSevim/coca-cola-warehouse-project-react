import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

import AuthLayout from 'layout/Auth';
import Login from 'pages/auth/auth1/login';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />
        }
      ]
    },
    LoginRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
