import { Divider, Table, Space, message } from 'antd';
import { useState } from 'react';
import { Row, Col, ListGroup, Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {useEffect} from 'react'
import axios from 'axios'
import { useTranslation } from "react-i18next";
const App = (props) => {
  const {t} = useTranslation();
  let [num, setNum] = useState(0);
  let [total, setTotal] = useState(0);
  let [data, setData] = useState([])
  localStorage.setItem("total",total);
 useEffect(()=>{
  const fetchCarts=async ()=>{
    const list=await axios.get(`/api/carts/${props.user}`);
    setData(list.data)
    setNum(list.data.length)
   if( list.data.length===0){
    setTotal(0)
   }else{
    setTotal(calc)
   }
}
fetchCarts()
},[num])
 
  //获取总的价格
  const calc = () => {
    let sum = 0;
    data.map((item) => {
      sum += item.price * item.num;
    })
    return sum;
  }


  //减少
  const subHandle = (value) => {
    if (value.num < 1) return;
    data.map((item,index)=>{
        if(item.name === value.name)  item.num-=1;
      return item
    })
    setTotal(calc)
  }
  //增加
  const addHandle = (value) => {
   
//获取商品信息
let countInStock=0;
    const getGoods=async ()=>{
      const list=await axios.get(`/api/products/${value.goods_id}`)
      countInStock=list.data.countInStock;

      data.map((item,index)=>{
        if(value.name === item.name && item.num<countInStock)  item.num+=1;
      return item
    })

      setTotal(calc)
    }
   if(value.goods_id!==null){
    getGoods();
   }
    
  }

//删除
const deleteHandle=(item)=>{
  const fetchCarts=async ()=>{
    const list=await axios.delete(`/api/carts/${item.id}`);
   if(list.data.code===200){
      message.success('删除成功!');
      window.location.reload()
     }else{
      message.error('删除失败')
     }
}
fetchCarts()
}
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Num',
      dataIndex: 'num',
    },
    ,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={subHandle.bind(null, record)}>-</a>
          <a onClick={addHandle.bind(null, record)}>+</a>
          <Button onClick={deleteHandle.bind(null, record)} size="sm">删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Link className='btn btn-dark my-3' to={`/?email=${localStorage.getItem('username')}`}>
      {t('GoHome')}
      </Link>

      <Divider />

      <Table columns={columns} dataSource={data} />
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>{`共${num}件商品`}</Col>
              </Row>
              <Row>
                <Col><strong>￥{total}</strong></Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>

              <LinkContainer to='/pay'>
                <Button className='btn-block' type='button' >支付</Button>
              </LinkContainer>

            </ListGroup.Item>

          </ListGroup>

        </Card>

      </Col>

    </div>
  );
};
export default App;
