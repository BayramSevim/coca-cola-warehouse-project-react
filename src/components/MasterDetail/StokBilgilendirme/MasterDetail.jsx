import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, GroupPanel, SearchPanel, Pager, Summary, TotalItem } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetWarehouseUrl } from '../../../api/gama';

const App = () => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);
  const fetchData = () => {
    const url = `${GetWarehouseUrl()}/api/Warehouse/GetMaterial`;
    const suppliersData = createStore({
      key: 'id',
      loadUrl: url
    });
    setOrderHistoryStore(suppliersData);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      <SearchPanel visible={true} width={200} />
      <Paging defaultPageSize={3} />
      <Column dataField="code" caption="M.Kodu" alignment="center" />
      <Column dataField="name" caption="M.Adı" alignment="center" />
      <Column dataField="rackName" caption="Raf Adı" alignment="center" />
      <Column dataField="quantity" caption="Stok" alignment="center" />
      <Column dataField="criticalStock" caption="Kritik Stok" alignment="center" />

      <Summary>
        <TotalItem showInColumn="code" column="code" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;
