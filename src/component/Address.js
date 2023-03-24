import {Form, Input, Radio } from 'antd';
import { useState } from 'react';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
//详细地址
const addressChange=(e)=>{
  localStorage.setItem('address',e.target.value)
 
}
//邮件编码
const postcodeChange=(e)=>{
  localStorage.setItem('postcode',e.target.value)
}
//收件人
const addresseeChange=(e)=>{
  localStorage.setItem('addressee',e.target.value)
}

//联系电话
const phoneChange=(e)=>{
  localStorage.setItem('phone',e.target.value)
}


const Address = (props) =>{
  let logistics=localStorage.getItem('logistics')===null?1:localStorage.getItem('logistics');
  const [value, setValue] = useState(+logistics);
  const onChange = (e) => {
    localStorage.setItem('logistics',e.target.value)
    setValue(e.target.value);
  };

  return  (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        marginTop:50,
      }}
      initialValues={{
        address:localStorage.getItem('address'),
        postcode:localStorage.getItem('postcode'),
        addressee:localStorage.getItem('addressee'),
        phone:localStorage.getItem('phone'),
        logistics:value
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="详细地址"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your Detailed address!',
          },
        ]}
      >
        <Input  onChange={addressChange}/>
      </Form.Item>
  
      <Form.Item
        label="邮政编码"
        name="postcode"
        rules={[
          {
            required: true,
            message: 'Please input your Postal Code!',
          },
        ]}
      >
        <Input onChange={postcodeChange}/>
      </Form.Item>

     
      <Form.Item
        label="联系人"
        name="addressee"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input onChange={addresseeChange}/>
      </Form.Item>
      <Form.Item
        label="联系电话"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input onChange={phoneChange}/>
      </Form.Item>


     <Form.Item
       label="物流"
       name="logistics"
     >
<Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>申通</Radio>
      <Radio value={2}>圆通</Radio>
      <Radio value={3}>德邦</Radio>
    </Radio.Group>
     </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      </Form.Item>
    </Form>
  );
}
export default Address;
