import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

// Sayfalar burada
const DashboardPage = Loadable(lazy(() => import('pages/Dashboard/DashboardPage')));
const MalKabul = Loadable(lazy(() => import('pages/mal-kabul/MalKabul')));
const MalCikis = Loadable(lazy(() => import('pages/mal-cikis/MalCikis')));
const Transfer = Loadable(lazy(() => import('pages/transfer/Transfer')));
const MalzemeHareketleri = Loadable(lazy(() => import('pages/malzeme-hareketleri/MalzemeHareketleri')));
const StokBilgilendirme = Loadable(lazy(() => import('pages/stok-bilgilendirme/StokBilgilendirme')));
const Raf = Loadable(lazy(() => import('pages/RafIslemleri/index')));
const RafEkleme = Loadable(lazy(() => import('pages/RafIslemleri/RafEkle/AddRack')));
const RafGuncelleme = Loadable(lazy(() => import('pages/RafIslemleri/RafGuncelleme/UpdateRack')));
const User = Loadable(lazy(() => import('pages/Kullanici/User')));
const AddUser = Loadable(lazy(() => import('pages/Kullanici/KullaniciEkle/AddUser')));
const UpdateUser = Loadable(lazy(() => import('pages/Kullanici/KullaniciGuncelle/UpdateUser')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />
        }
      ]
    },
    {
      path: '/depo',
      element: <DashboardLayout />,
      children: [
        {
          path: 'mal-kabul',
          element: <MalKabul />
        },
        {
          path: 'mal-cikis',
          element: <MalCikis />
        },
        {
          path: 'raf-islemleri',
          element: <Raf />
        },
        {
          path: 'raf-ekleme',
          element: <RafEkleme />
        },
        {
          path: 'raf-guncelleme',
          element: <RafGuncelleme />
        },
        {
          path: 'malzeme-hareketleri',
          element: <MalzemeHareketleri />
        },
        {
          path: 'stok-bilgilendirme',
          element: <StokBilgilendirme />
        },
        {
          path: 'transfer',
          element: <Transfer />
        },
        {
          path: 'kullanici-islemleri',
          element: <User />
        },
        {
          path: 'kullanici-ekleme',
          element: <AddUser />
        },
        {
          path: 'kullanici-guncelleme',
          element: <UpdateUser />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
