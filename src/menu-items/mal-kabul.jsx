// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I3Dcube, DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  I3Dcube: I3Dcube
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const malKabul = {
  id: 'mal-kabul',
  title: <FormattedMessage id="mal-kabul" />,
  type: 'group',
  url: '/mal-kabul',
  icon: icons.I3Dcube
};

export default malKabul;
