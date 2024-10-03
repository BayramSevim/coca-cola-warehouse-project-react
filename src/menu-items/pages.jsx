// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  I24Support,
  MessageProgramming,
  Book,
  Diagram,
  Element,
  Receive,
  Forward,
  HambergerMenu,
  DirectDown,
  Box,
  Layer,
  KeyboardOpen,
  PresentionChart,
  I3Dcube,
  I3DCubeScan,
  ArrowSwapHorizontal,
  Share,
  BoxSearch,
  InfoCircle,
  User,
  UserAdd,
  UserRemove
} from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support,
  report: Book,
  product: Diagram,
  element: Element,
  consume: Receive,
  transfer: Forward,
  hamburger: HambergerMenu,
  vakum: DirectDown,
  package: Box,
  silo: Layer,
  equipment: KeyboardOpen,
  trend: PresentionChart,
  malKabul: I3Dcube,
  malCikis: I3DCubeScan,
  transfer: ArrowSwapHorizontal,
  depo: Share,
  malzemeHareketleri: BoxSearch,
  info: InfoCircle,
  user: User,
  userAdd: UserAdd,
  userRemove: UserRemove
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  icon: icons.depo,
  children: [
    {
      id: 'mal-kabul',
      title: <FormattedMessage id="mal-kabul" />,
      type: 'item',
      url: '/depo/mal-kabul',
      icon: icons.malKabul,
      target: false
    },
    {
      id: 'mal-cikis',
      title: <FormattedMessage id="mal-cikis" />,
      type: 'item',
      url: '/depo/mal-cikis',
      icon: icons.malCikis,
      target: false
    },
    {
      id: 'raf-islemleri',
      title: <FormattedMessage id="raf-islemleri" />,
      type: 'collapse',
      url: '/depo/raf-islemleri',
      icon: icons.malCikis,
      children: [
        {
          id: 'raf-ekleme',
          title: <FormattedMessage id="raf-ekleme" />,
          type: 'item',
          url: '/depo/raf-ekleme',
          icon: icons.malCikis
        },
        {
          id: 'raf-guncelleme',
          title: <FormattedMessage id="raf-guncelleme" />,
          type: 'item',
          url: '/depo/raf-guncelleme',
          icon: icons.malCikis
        }
      ]
    },
    {
      id: 'malzeme-hareketleri',
      title: <FormattedMessage id="malzeme-hareketleri" />,
      type: 'item',
      url: '/depo/malzeme-hareketleri',
      icon: icons.malzemeHareketleri,
      target: false
    },
    {
      id: 'transfer',
      title: <FormattedMessage id="transfer" />,
      type: 'item',
      url: '/depo/transfer',
      icon: icons.transfer,
      target: false
    },
    {
      id: 'stock-bilgilendirme',
      title: <FormattedMessage id="stock-bilgilendirme" />,
      type: 'item',
      url: '/depo/stok-bilgilendirme',
      icon: icons.info,
      target: false
    },
    {
      id: 'user',
      title: <FormattedMessage id="user" />,
      type: 'collapse',
      url: '/depo/kullanici-islemleri',
      icon: icons.user,
      children: [
        {
          id: 'kullanici-ekleme',
          title: <FormattedMessage id="kullanici-ekleme" />,
          type: 'item',
          url: '/depo/kullanici-ekleme',
          icon: icons.userAdd
        },
        {
          id: 'kullanici-guncelleme',
          title: <FormattedMessage id="kullanici-guncelleme" />,
          type: 'item',
          url: '/depo/kullanici-guncelleme',
          icon: icons.userRemove
        }
      ]
    }
  ]
};

export default pages;
