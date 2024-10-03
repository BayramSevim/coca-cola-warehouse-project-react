import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { GetAPIUrl } from '../../../api/gama';

const App = ({ dateS, dateF, productId }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(dateS));
  const formattedDateF = formatDate(new Date(dateF));

  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    const url = `${GetAPIUrl()}/api/Product/GetProductByGroup?dateS=${formattedDateS}&dateF=${formattedDateF}&productId=${productId}`;

    const suppliersData = createStore({
      key: 'code',
      loadUrl: url
    });
    setOrderHistoryStore(suppliersData);
  }, [formattedDateS, formattedDateF, productId]);

  return (
    <DataGrid
      dataSource={orderHistoryStore}
      remoteOperations={false}
      showBorders={true}
      allowColumnReordering={true}
      columnHidingEnabled={true}
      id="gridContainer"
    >
      <Pager allowedPageSizes={[10, 20, 50]} showPageSizeSelector={true} showNavigationButtons={true} />
      <GroupPanel visible={true} emptyPanelText="İstediğiniz alana göre gruplamak için sütun başlığını buraya sürükleyiniz." />
      <SearchPanel visible={true} width={310} />
      <Paging defaultPageSize={10} />

      <Column dataField="code" caption="Hammadde Kod" alignment="center" />
      <Column dataField="name" caption="Hammadde Ad" alignment="center" />
      <Column dataField="sumTarget" caption="Teorik M." alignment="center" />
      <Column dataField="sumActual" caption="Pratik M." alignment="center" />
      <Column dataField="diff" caption="Fark" alignment="center" />
      <Column dataField="diffPerc" caption="Yüzde Fark" alignment="center" />
      <Summary>
        <TotalItem showInColumn="code" summaryType="count" />
        <TotalItem showInColumn="sumTarget" column="sumTarget" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem showInColumn="sumActual" column="sumActual" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem showInColumn="diff" column="diff" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;
