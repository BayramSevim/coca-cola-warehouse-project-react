import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { GetAPIUrl } from '../../../api/gama';

const OrderHistory = ({ productId }) => {
  const [suppliersData, setSuppliersData] = useState(null);
  const url = `${GetAPIUrl()}/api/Product/GetFormulaDetail?batchId=${productId}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setSuppliersData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <DataGrid dataSource={suppliersData} showBorders={true}>
      <Paging defaultPageSize={15} />
      <Column dataField="unitName" caption="Birim Ad" alignment="center" />
      <Column dataField="siloName" caption="Silo Ad" alignment="center" />
      <Column dataField="rawMatCode" caption="Hammadde Kod" alignment="center" />
      <Column dataField="rawMatName" caption="Hammadde Adı" alignment="center" />
      <Column dataField="queue" caption="Sıra" alignment="center" />
      <Column dataField="amount" caption="Miktar" alignment="center" />

      <Summary>
        <TotalItem column="amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default OrderHistory;
