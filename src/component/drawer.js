import { PlusOutlined } from '@ant-design/icons';
import { Button, Col,  Drawer, Form, Input, Row, Space,message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import UploadImg from './UploadImg'
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish=async(data)=>{
    data.image=localStorage.getItem("img");
    if(data.image===''){
      message.error('请上传图片');
      return;
    }
    await axios.post('/goods/add',data,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then((res)=>{
      if(res.data.code===200){
       message.success('添加成功')
       window.location.reload()
       return;
       }
       message.warning('添加失败')
    }).catch((err)=>{
         message.error(err)
    })
    setOpen(false)
    localStorage.setItem("img","");
  }
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New alcohol
      </Button>
      <Drawer
        title="Create a new alcohol"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form layout="vertical"   onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
               
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol name',
                  },
                ]}
              >
                <Input placeholder="Please enter alcohol name"  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Alcohol Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol description',
                  },
                ]}
              >
            <Input placeholder="Please enter alcohol description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Alcohol brand"
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol brand',
                  },
                ]}
              >
                <Input placeholder="Please enter alcohol brand" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Alcohol category"
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol category',
                  },
                ]}
              >
            <Input placeholder="Please enter alcohol category" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Alcohol price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol price',
                  },
                ]}
              >
                <Input placeholder="Please enter alcohol price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="countInStock"
                label="Alcohol countInStock"
                rules={[
                  {
                    required: true,
                    message: 'Please enter alcohol countInStock',
                  },
                ]}
              >
            <Input placeholder="Please enter alcohol countInStock" />
              </Form.Item>
            </Col>
          </Row>
        
          <Row gutter={16}>
            
            <Col span={24}>
              <Form.Item>
              <UploadImg />
              </Form.Item>
              </Col>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default App;