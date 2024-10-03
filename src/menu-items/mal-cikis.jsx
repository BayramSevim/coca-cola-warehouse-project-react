// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I3DCubeScan, DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: DocumentCode2,
  I3DCubeScan: I3DCubeScan
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const malCikis = {
  id: 'mal-cikis',
  title: <FormattedMessage id="mal-cikis" />,
  type: 'group',
  url: '/mal-cikis',
  icon: icons.I3DCubeScan
};

export default malCikis;
