import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../component/Product'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import paramToObj from '../utils/paramToObj'
import { Input} from 'antd';
import { useTranslation } from "react-i18next";
const { Search } = Input;
const HomeScreen = (props) => {
  const {t} = useTranslation();
  const [products,setProducts]=useState([]);
  const location = useLocation();
 const obj=paramToObj(location.search);
 let email="";
  if(Object.keys(obj)!==0){
    email=obj.email;
    props.getEmail(email)
    localStorage.setItem("username",email);
  }
  useEffect(()=>{
    const fetchProducts=async ()=>{
         const {data}=await axios.get('/api/products')
        setProducts(data)
    }
    fetchProducts()
  },[]);
    //查询
    const onSearch = (value) => {
     if(value!==''){
      let data=products.filter(item=>{
        return item.name.indexOf(value)!==-1
      })
      setProducts(data);
     }else{
      window.location.reload();
     }
     
 }
  return (
    <>
    <Row>
<Col>
<div style={{width:400}}>
<h1>{t('LatestProducts')}</h1> <Search
      placeholder="input search goods name"
      allowClear
      enterButton= {t('search')}
      size="large"
      onSearch={onSearch}
      className="search"
    />
</div>
   
</Col>
    </Row>
    
    <Row>{products.map(product=>(
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
     <Product product={product}/>
    </Col>
    ))}</Row>
    
    </>
  )
}
export default HomeScreen
