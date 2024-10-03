import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import MasterDetailView from './MasterDetailView';
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
    const url = `${GetAPIUrl()}/api/Product/GetProductByDate?dateS=${formattedDateS}&dateF=${formattedDateF}&typeId=0&productId=${productId}&formulaId=0`;

    const suppliersData = createStore({
      key: 'id',
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
      <MasterDetail enabled={true} component={MasterDetailView} />
      <Paging defaultPageSize={15} />

      <Column dataField="productCode" caption="Mamül Kod" alignment="center" />
      <Column dataField="productName" caption="Mamül Ad" alignment="center" />
      <Column dataField="formulaCode" caption="Formül Kod" alignment="center" />
      <Column dataField="formulaName" caption="Formül Ad" alignment="center" />
      <Column dataField="createdDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" />
      <Column dataField="endedDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" />
      <Column dataField="batchNo" caption="B.No" alignment="center" />
      <Column dataField="targetCount" caption="B.Hedef" alignment="center" />
      <Column dataField="targetAmount" caption="Teorik M." alignment="center" />
      <Column dataField="actualAmount" caption="Pratik M." alignment="center" />
      <Column dataField="isStarted" caption="Başladı" alignment="center" />
      <Column dataField="isEnded" caption="Bitti" alignment="center" />
      <Column dataField="productSiloName" caption="Silo Ad" alignment="center" />
      <Summary>
        <TotalItem showInColumn="productCode" column="targetCount" summaryType="count" />
        <TotalItem column="targetAmount" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem column="actualAmount" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;
