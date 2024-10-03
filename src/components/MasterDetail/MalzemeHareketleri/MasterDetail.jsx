import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Column, DataGrid, Paging, GroupPanel, SearchPanel, Pager, Summary, TotalItem } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetWarehouseUrl } from '../../../api/gama';

// `forwardRef` ile App bileşenini sarmalıyız
const App = forwardRef(({ cellId, dateS, dateF, makinaId, materialId }, ref) => {
  let id = 0;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(dateS));
  const formattedDateF = formatDate(new Date(dateF));

  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  // Veri çekme fonksiyonu
  const fetchData = () => {
    if (cellId <= 0) {
      return;
    }
    const url = `${GetWarehouseUrl()}/api/Warehouse/GetMatActHistory?cellId=${cellId}&dateS=${formattedDateS}&dateF=${formattedDateF}&makinaId=${makinaId}&materialId=${materialId}`;
    const suppliersData = createStore({
      key: id++,
      loadUrl: url
    });
    setOrderHistoryStore(suppliersData);
  };

  // useImperativeHandle ile dışarıya fonksiyon aktarıyoruz
  useImperativeHandle(ref, () => ({
    refreshData() {
      fetchData();
    }
  }));

  // İlk renderda veri çek
  useEffect(() => {
    fetchData();
  }, [formattedDateS, formattedDateF, materialId]);

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
      <Column dataField="progressTypeName" caption="H.Tipi" alignment="left" width={78} />
      <Column dataField="materialCode" caption="M.Kodu" alignment="left" width={55} />
      <Column dataField="materialName" caption="Malzeme Adı" alignment="left" width={100} />
      <Column dataField="rackName" caption="Raf Adı" alignment="left" width={65} />
      <Column dataField="makinaName" caption="Makina Adı" alignment="left" width={160} />
      <Column dataField="createdDate" dataType="date" caption="Tarih" alignment="center" format="dd.MM.yyyy HH.mm" width={120} />
      <Column dataField="comment" caption="Açıklama" alignment="left" />

      <Summary>
        <TotalItem showInColumn="progressTypeName" column="progressTypeName" summaryType="count" />
      </Summary>
    </DataGrid>
  );
});

export default App;
