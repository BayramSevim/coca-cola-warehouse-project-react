import React, { useCallback } from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
// import { DataGridTypes } from 'devextreme-react/data-grid';

import OrdersTab from './OrdersTab';
import BatchDetail from './BatchDetail';

const MasterDetailView = (props) => {
  const renderOrdersTab = useCallback(() => <OrdersTab id={props.data.key} />, [props.data.key]);

  const renderBatchTab = useCallback(() => <BatchDetail id={props.data.key} />, [props.data.key]);

  return (
    <TabPanel>
      <Item title="Batch Detayları" render={renderBatchTab} />
      <Item title="Formül Detayları" render={renderOrdersTab} />
    </TabPanel>
  );
};

export default MasterDetailView;
