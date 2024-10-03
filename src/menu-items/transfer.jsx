// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Convertshape, DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  Convertshape: Convertshape
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const transfer = {
  id: 'transfer',
  title: <FormattedMessage id="transfer" />,
  type: 'group',
  url: '/transfer',
  icon: icons.Convertshape
};

export default transfer;
