import { Button, Col,  Drawer, Form, Input, Row, Space,message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
const App = (props) => {
  const [open, setOpen] = useState(false);
  const showDrawer1 = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish=async(data)=>{
    console.log(data.alcohol_name)
    await axios.put(`/goods`
    ,data,{
      headers:{
        "Content-Type":'application/json'
      }
    }
    
    ).then((res)=>{
      if(res.data.code===200){
       message.success('修改成功')
       window.location.reload()
       return;

       }
       message.warning('修改失败')
    
    }).catch((err)=>{
         message.error(err)
    })
    setOpen(false)
  }
  return (
    <>
      <Button onClick={showDrawer1}>
        Update
      </Button>
      <Drawer
        title="Update a alcohol"
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
        <Form layout="vertical"   
       initialValues={{ 
        id:props.data.id,
        name:props.data.name,
        description:props.data.description,
        brand:props.data.brand,
        category:props.data.category,
        price:props.data.price,
        countInStock:props.data.countInStock,
      }}
        onFinish={onFinish}>
           <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="id"
                label="Id"
               
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input  type="text" readOnly/>
              </Form.Item>
            </Col>
            </Row>
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