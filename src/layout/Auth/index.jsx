import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// project import
import GuestGuard from 'utils/route-guard/GuestGuard';
import Loader from 'components/Loader';

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthLayout() {
  return (
    <Suspense fallback={<Loader />}>
      {/* <GuestGuard> */}
      <Outlet />
      {/* </GuestGuard> */}
    </Suspense>
  );
}
