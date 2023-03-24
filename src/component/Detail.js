import { Descriptions } from 'antd';
const Detail = () => {
  let total=localStorage.getItem('total');
  let logistics=localStorage.getItem('logistics')
  let ordercode;
  if(localStorage.getItem('ordercode')!==null){
    ordercode=localStorage.getItem('ordercode');
  }else{
    ordercode=Math.random().toFixed(18).substring(2,18);
    localStorage.setItem("ordercode",ordercode);
  }
  let yf=0;
  if(logistics==='1'){
    yf=10;
    logistics='申通';
  }else if(logistics==='2'){
    yf=20;
    logistics='圆通';
  }else if(logistics==='3'){
    yf=30;
    logistics='德邦';
  }
   let zj=+total+yf;

   
  return (
  
    <Descriptions title="订单详情">
    <Descriptions.Item label="产品总价">￥{total}</Descriptions.Item>
    <Descriptions.Item label="运费">￥{yf}</Descriptions.Item>
    <Descriptions.Item label="订单总价">￥{zj}</Descriptions.Item>
    <Descriptions.Item label="地址">
     {localStorage.getItem('address')}
    </Descriptions.Item>
    <Descriptions.Item label="收件人">
     {localStorage.getItem('addressee')}
    </Descriptions.Item>
    <Descriptions.Item label="联系电话">
     {localStorage.getItem('phone')}
    </Descriptions.Item>
    <Descriptions.Item label="邮政编码">
     {localStorage.getItem('postcode')}
    </Descriptions.Item>
    <Descriptions.Item label="物流">
      {logistics}
    </Descriptions.Item>
    <Descriptions.Item label="订单编号">
      {ordercode}
    </Descriptions.Item>
  </Descriptions>

  
);
}
export default Detail;