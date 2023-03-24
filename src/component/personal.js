import React from 'react'
import { Dropdown, Button } from 'antd';
import {createBrowserHistory} from 'history';
const history = createBrowserHistory();

const items = [
  {
    label: <a onClick={()=>{
      history.push({pathname:`/account/center/1`})
      history.go()
    }}>个人中心</a>,
    key: '0',
  },
  {
    label: <a onClick={()=>{
      history.push({pathname:`/account/center/2`})
      history.go()
    }}>我的订单</a>,
    key: '1',
  },
  {
    label: <a onClick={()=>{
      history.push({pathname:`/account/center/3`})
      history.go()
    }}>我的地址</a>,
    key: '2',
  },
  {
    label: <a onClick={()=>{
      localStorage.setItem("username","");
        history.push({pathname:`/`})
        history.go()
    }}>退出</a>,
    key: '3',
  }
];
// 个人中心
const personal = () => {
  let username=localStorage.getItem("username")
  return (
    <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <Button type='link' style={{color:'white'}}>
      {username}
    </Button>
  </Dropdown>
  )
}

export default personal
