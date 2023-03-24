import React from 'react'
import Order from '../component/Order'
const CartScreen = (props) => {
 
  return (
    <div>
      <Order user={props.getEmail()}/>
    </div>
  )
}
export default CartScreen
