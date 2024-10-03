import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetAPIUrl } from 'api/gama';

const BatchHistory = ({ productId }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    if (productId) {
      const url = `${GetAPIUrl()}/api/Product/GetBatchDetail?batchId=${productId}`;

      const suppliersData = createStore({
        key: 'id',
        loadUrl: url
      });
      setOrderHistoryStore(suppliersData);
    }
  }, [productId]);

  return (
    <DataGrid dataSource={orderHistoryStore} showBorders={true}>
      <Paging defaultPageSize={15} />
      <Column dataField="rawMatCode" caption="Hammadde Kod" alignment="center" />
      <Column dataField="rawMatName" caption="Hammadde Ad" alignment="center" />
      <Column dataField="createdDate" dataType="date" caption="Başlangıç Tarihi" alignment="center" />
      <Column dataField="targetAmount" caption="Teorik M." alignment="center" />
      <Column dataField="actualAmount" caption="Pratik M." alignment="center" />
      <Column dataField="spentTime" caption="Süre (sn)" alignment="center" />
      <Column dataField="siloName" caption="Silo Ad" alignment="center" />

      <Summary>
        <TotalItem column="amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default BatchHistory;
