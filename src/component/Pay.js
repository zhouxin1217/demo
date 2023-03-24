import {Radio, Space } from 'antd';
import { useState } from 'react';
const Pay = () => {

  const [value, setValue] = useState(+localStorage.getItem('pay'));
  if(localStorage.getItem('pay')===null){
    localStorage.setItem('pay',1);
    setValue(1);
  }
  
  
  const onChange = (e) => {
    localStorage.setItem('pay',e.target.value)
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>支付宝</Radio>
        <Radio value={2}>PayPal</Radio>
      </Space>
    </Radio.Group>
  );
};
export default Pay;