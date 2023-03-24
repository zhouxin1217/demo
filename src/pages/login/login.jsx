import React,{useState} from 'react'
import {Select, Form, Input, Button, message,Modal} from 'antd'
import { MailOutlined, LockOutlined,ArrowRightOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import {createBrowserHistory} from 'history';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [ role , setRole ] = useState(0);
  const handleChange = (value) => {
    setRole(value)
  };
 
   const onFinish =  async(event) => {
    
   let flag=false;
   let data=JSON.stringify(event)
   const history = createBrowserHistory();
   let urole='0'
    await axios.post('/userquery',data,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then((res)=>{
     if(res.data.code===200){
      flag=true;
     }
     
     urole=res.data.data.role
    }).catch((err)=>{
      message.error(err)
    })
    if(+role===1 && +urole===1 && flag){
      history.push(`/admin`)
      history.go()
      message.success('Login succeeded')
      localStorage.setItem("username",event['email']);
    }else if(+role===0 && +urole===0 && flag){
      navigate({
       pathname:'/',
       search:qs.stringify({
        email:`${event['email']}`
       })
    })
    message.success('Login succeeded')
   }else{
  
    Modal.confirm({
      title: 'The email or password is incorrect. Are you sure to register?',
      icon: <ExclamationCircleOutlined/>,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
          //确认按钮的回调方法，在下面
           history.push({pathname:`/register?email=${event['email']}&password=${event['password']}`})
           history.go()
      }
      ,
      onCancel() {
          console.log('Cancel');
      },
  });
   
   }



  }

  return (
    
    <div style={{width:400,marginLeft:'30%',marginTop:'10%'}}>
          {/* <h4>User Login</h4> */}
         
          <Select
      defaultValue="个人"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: '0',
          label: '个人',
        },
        {
          value: '1',
          label: '管理员',
        }
      ]}
    />
      <Form
            validateTrigger={['onBlur', 'onChange']}
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
                  min: 9,
                  message: 'Email address cannot be less than 9 digits'
                }
                ,
                {
                  max: 30,
                  message: 'Email address cannot exceed 30 characters'
                }
              ]}
            >
              <Input size="large" placeholder="email" prefix={<MailOutlined />} />
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
                  min: 8,
                  message: 'The password length cannot be less than 8 digits'
                }
                ,
                {
                  max: 20,
                  message: 'The password length cannot exceed 20 digits'
                }
              ]}
            >
              <Input size="large" type='password' placeholder="password" prefix={<LockOutlined />} />
            </Form.Item>


            <Form.Item>
              <div >
                
         
             
      <Button type="primary"  htmlType="submit" size="large" block>
                Login
              </Button>
              
              </div>

              {+role===0?( <div>
              <Link to={`/register`}>
             <span > If this is your first login, please registe.</span>
            <Button  size="large" block>
            {<ArrowRightOutlined />}  Go to register
                </Button>
              </Link>
              </div>):''}
             
            </Form.Item>

          </Form>
    </div>
  )
}

export default Login
