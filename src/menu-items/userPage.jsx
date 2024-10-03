// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const UserPage = {
  id: 'user-add',
  title: <FormattedMessage id="kullanici-ekle" />,
  type: 'group',
  url: '/user-add'
  // icon: icons.samplePage
};

export default UserPage;
