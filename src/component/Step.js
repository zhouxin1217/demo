/**步骤条 */

import { Button, message, Steps, theme } from 'antd';
import { useState } from 'react';
import Address from './Address'
import Pay from './Pay'
import Detail from './Detail'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();
const Step = () => {
  const removeLocalStorage=()=>{
    localStorage.removeItem('logistics');
        localStorage.removeItem('postcode');
        localStorage.removeItem('address');
        localStorage.removeItem('ordercode');
        localStorage.removeItem('addressee');
        localStorage.removeItem('phone');
        localStorage.removeItem('pay');
        localStorage.removeItem('total');
  }
  
  const steps = [
    {
      title: '收货地址',
      content: <Address />,
    },
    {
      title: '支付',
      content: <Pay />,
    },
    {
      title: '确认订单',
      content: <Detail />,
    },
  ];



  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    
     if(current===0 && (localStorage.getItem('address')===null || localStorage.getItem('addressee')===null || 
     localStorage.getItem('postcode')===null || localStorage.getItem('phone')===null)){
      message.error('请输入完整信息!');
       return;
     }
    setCurrent(current + 1);
  };
  const prev = () => {
    
    setCurrent(current - 1);
   
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            继续下一步
          </Button>
          
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {
            let order={
              "order_id":localStorage.getItem('ordercode'),
              "total":localStorage.getItem('total'),
              "shipping_name":localStorage.getItem('logistics'),
              "user_id":localStorage.getItem('username'),
              "payment_type":localStorage.getItem('pay')
            }
            axios.post('/api/orders/add',order,{
              headers:{
                "Content-Type":'application/json'
              }
            }).then((res)=>{
             if(res.data.code===200){
             message.success('订单提交成功');
             removeLocalStorage();
             history.push("/")
             history.go()
             }
            }).catch((err)=>{
              message.error(err)
            })
          }}>
            提交订单
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >上一步
          </Button>
          
        )}
        {current===0 &&  <Link to='/cart'>
        <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >上一步
          </Button>
     </Link>}

     {
      <Link to='/cart'>
       <Button
       style={{
         margin: '0 8px',
       }}
       onClick={removeLocalStorage}
     >取消
     </Button>
     </Link>
     }
      </div>
    </>
  );
};
export default Step;