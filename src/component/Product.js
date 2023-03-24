import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
  return (
    <Card className='my-3 py-3 rounded'>
      <Link to={`/products/${product.id}`}>
      <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
      <Link to={`/products/${product.id}`}>
      <Card.Title>{product.name}</Card.Title>
      </Link>
      <Card.Text as='div'>
        <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews}条评论`} />
        </div>
        </Card.Text>
        <Card.Text as='h3'>
            ￥{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
