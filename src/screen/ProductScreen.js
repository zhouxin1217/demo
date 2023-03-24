import React,{useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button} from 'react-bootstrap'
import {message} from 'antd'
import Rating from '../component/Rating'
import axios from 'axios'
import { useTranslation } from "react-i18next";
const ProductScreen = (props) => {
  
  const {t} = useTranslation();
    const { id } = useParams();
    
   const [product,setProduct]=useState({})

   useEffect(()=>{
    const fetchProduct=async ()=>{
         const {data}=await axios.get(`/api/products/${id}`)
        setProduct(data)
    }
    fetchProduct()
  },[id]);
  const addCart=(data)=>{
    if(localStorage.getItem('username')!=='undefined'){
       let cart={name:data.name,price:data.price,num:1,u_email:props.getEmail(),goods_id:data.id}
      axios.post('/api/carts',cart,{
        headers:{
          "Content-Type":'application/json'
        }
      }).then((res)=>{
       if(res.data.code===200){
       message.success('添加商品成功');
       }
      }).catch((err)=>{
        message.error(err)
      })

    }else{
      message.warning('请先登陆!');
    }

  }
    
  return (
    <>
     <Link className='btn btn-dark my-3' to={`/?email=${localStorage.getItem('username')}`}>
      {t('GoHome')}
     </Link>
     <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
             <Rating value={product.rating} text={`${product.numReviews}条评论`}/>
            </ListGroup.Item> 
            <ListGroup.Item> 价格:${product.price} </ListGroup.Item>
            <ListGroup.Item> 描述:{product.description} </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>价格:</Col>
                    <Col><strong>￥{product.price}</strong></Col>
                  </Row>

                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>库存:</Col>
                    <Col>{product.countInStock>0?'有货':'没货'}</Col>
                  </Row>

                </ListGroup.Item>
                <ListGroup.Item>
               <Button className='btn-block' type='button' onClick={addCart.bind(null,product)} disabled={product.countInStock===0}>添加到购物车</Button>
                </ListGroup.Item>

              </ListGroup>

          </Card>

        </Col>
     </Row>
    </>
  )
}

export default ProductScreen
