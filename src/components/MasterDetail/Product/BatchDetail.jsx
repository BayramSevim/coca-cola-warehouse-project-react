import React, { useCallback } from 'react';
import { Form, Item } from 'devextreme-react/form';
import BatchHistory from './BatchHistory';

const OrdersTab = (props) => {
  const renderOrderHistory = useCallback(() => <BatchHistory productId={props.id} />, [props.id]);

  return (
    <Form labelLocation="top" className="form-container">
      <Item render={renderOrderHistory} />
    </Form>
  );
};

export default OrdersTab;
