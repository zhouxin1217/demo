import React from 'react'
import {  Form, Input, Button, message} from 'antd'
 import { LockOutlined,MailOutlined,ArrowLeftOutlined } from '@ant-design/icons';
 import {Link,useLocation } from 'react-router-dom'
 import axios from 'axios';
import {createBrowserHistory} from 'history';
 import paramToObj from '../utils/paramToObj'
const Register = () => {
    const location = useLocation();
 
  const obj=paramToObj(location.search)
  
 
  
    const onFinish= async(event)=>{
      
     
      let flag=false;
      
      if(event['password']!==event['cpwd']){
        message.error('The two passwords are inconsistent')
        return;
       }
      
       await axios.post('/user',{email:event['email'],password:event['password']},{
         headers:{
           "Content-Type":'application/json'
         }
       }).then((res)=>{
      
        if(res.data.code===200){
         flag=true;
        }
   
       }).catch((err)=>{
         message.error(err)
       })

       const history = createBrowserHistory();
       if(flag){
        message.success('Register succeeded')
        history.push(`/login?${event['email']}`)
        history.go()
       
       }else{
        message.error('Register failed')
       }

    }
  return (
    <div style={{width:400,marginLeft:'30%',marginTop:'10%'}}>
      <h4 >User Register</h4>
         <Form
         validateTrigger={['onBlur', 'onChange']}
         initialValues={{
          email:obj.email,
          password:obj.password,
          cpwd: ''
        }}
            onFinish={onFinish}
        >
          
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter email',
              },
              {
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: 'Incorrect mailbox format',
                validateTrigger: 'onBlur'
              },
              {
                min:9,
                message:'Email address cannot be less than 9 digits'
              }
              ,
              {
                max:30,
                message:'Email address cannot exceed 30 characters'
              }
            ]}
                      >
            <Input size="large" placeholder="email"  prefix={<MailOutlined />}/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter password',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'The password must be in English, consisting of numbers or underscores',
                validateTrigger: 'onBlur'
              },
              {
                min:8,
                message:'The password length cannot be less than 8 digits'
              }
              ,
              {
                max:20,
                message:'The password length cannot exceed 20 digits'
              }
            ]}
          >
            <Input size="large" type='password' placeholder="password" prefix={<LockOutlined />}/>
          </Form.Item>
          <Form.Item
           name="cpwd"
          >
           <Input size="large" type="password" placeholder="confirm password"  prefix={<LockOutlined />}/>
          </Form.Item>
          
          <Form.Item>
            <div >
            <Button type="primary" htmlType="submit" size="large" block>
             Submit
            </Button>
            </div>
            <div>
              
            <Link to={`/login`}>
            
            <Button   size="large" block>
                 {<ArrowLeftOutlined />} back login
                </Button>

              </Link>
            </div>
           
          </Form.Item>

        
        </Form>
    </div>
  )
}

export default Register
