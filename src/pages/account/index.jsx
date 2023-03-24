import { Card, Col, Tabs, Row, Space, Table, Tag, Button, Form, Input, Checkbox } from 'antd';
import { redirect, useParams } from 'react-router-dom';
import React, { useState, setVisible, useEffect, componentDidMount } from 'react'
import OrderDetail from './components/OrderDetail/index'
import AddrModal from './components/Addr/index'

export default function Account(props) {

  //获取跳转过来的tabActiveKey的index
  const { tabActiveKey } = useParams();

  //个人信息修改提交
  //个人信息
  const userInfo = {
    userName: '张三',
    phone: '18279218969',
    email: 'i718@msn.com',
  };
  const [data, setData] = useState({
    userName: '', age: ''
  })

  const onFinish = e => {
    console.log(e);
    setData({ userName: e.userName, age: e.age })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //tab
  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];

  //tempData 订单
  const dataOrder = [
    {
      key: '1',
      name: '20230313001',
      age: '剑南春',
      address: '￥599.00',
      createTime: '2023-03-12 12:23',
      tags: ['1'],
    },
    // {
    //   key: '2',
    //   name: '20230313002',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
    // {
    //   key: '3',
    //   name: '20230313003',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
    // {
    //   key: '4',
    //   name: '20230313004',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
    // {
    //   key: '5',
    //   name: '20230313005',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
    // {
    //   key: '6',
    //   name: '20230313006',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
    // {
    //   key: '7',
    //   name: '20230313007',
    //   age: '剑南春',
    //   address: '￥599.00',
    //   createTime: '2023-03-12 12:23',
    //   tags: ['1'],
    // },
  ];
  const columnsOrder = [
    {
      title: '订单号',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '商品名称',
      dataIndex: 'age',
      key: 'age',
      width: 100
    },
    {
      title: '价格',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '数量',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '创建时间',
      width: 200,
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={parentTrigger}>详情</Button>
          <OrderDetail vis={parentVisble} fn={parentTrigger}></OrderDetail>
          <Button type="dashed" >开票管理</Button>
        </Space>
      ),
    },
  ];

  const parentTrigger = (data) => {
    setParentVisble(data);
  }

  const [parentVisble, setParentVisble] = useState(false);

  //打开新增地址详情
  const openAddAddrModal = (data) =>{
    setAddrModalVisble(data);
  }
  const [addrModalVisble, setAddrModalVisble] = useState(false);


  //tempData 地址
  const dataAddr = [
    {
      key: '1',
      name: '张三',
      age: '18279218969',
      address: '江西省九江市长虹大道110号',
      tags: ['使用中'],
    },
    {
      key: '2',
      name: '李四',
      age: '18279218969',
      address: '江西省九江市长虹大道110号',
      tags: ['使用中'],
    },
    {
      key: '3',
      name: '李四',
      age: '18279218969',
      address: '江西省九江市长虹大道110号',
      tags: ['停用'],
    },
    {
      key: '4',
      name: '李四',
      age: '18279218969',
      address: '江西省九江市长虹大道110号',
      tags: ['停用'],
    },
    {
      key: '5',
      name: '张三',
      age: '18279218969',
      address: '江西省九江市长虹大道110号',
      tags: ['停用'],
    },
  ];
  const columnsAddr = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '电话',
      dataIndex: 'age',
      key: 'age',
      width: 100
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '状态',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 2 ? 'green' : 'geekblue';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" >编辑</Button>
          <Button type="dashed" >删除</Button>
        </Space>
      ),
    },
  ];

  //tempPayAccout
  const dataPayAccount = [
    {
      "name": "中国工商银行",
      "cardType": "123",
      "bankAccount": "622370227232890",
      "accountName": "张三"
    }
  ]
  const columnsPayAccount = [
    {
      title: '银行名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '卡类型',
      dataIndex: 'cardType',
      key: 'cardType',
      width: 100
    },
    {
      title: '银行账号',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" >编辑</Button>
          <Button type="dashed" >删除</Button>
        </Space>
      ),
    },
  ];


  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col lg={5} md={2}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
          >
            <img style={{
              width: 185,
              height: 185,
              marginBottom: 50,
              borderRadius: 100
            }} alt="" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            <p>姓名：{userInfo.userName}</p>
            <p>电话：{userInfo.phone}</p>
            <p>邮箱：{userInfo.email}</p>
          </Card>
        </Col>
        <Col lg={16} md={12}>
          <Tabs
            defaultActiveKey={tabActiveKey}
            items={[
              {
                label: '基本资料',
                key: '1',
                children: <>
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item label="姓名" name="userName"><Input /></Form.Item>
                    <Form.Item label="电话" name="phone"><Input /></Form.Item>
                    <Form.Item label="邮箱" name="email"><Input /></Form.Item>
                    <Form.Item label="出生日期" name="email"><Input /></Form.Item>
                    <Form.Item label="我的URL" name="email"><Input /></Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        修改
                      </Button>
                    </Form.Item>
                  </Form>
                </>,

              },
              {
                label: '我的订单',
                key: '2',
                children: <><Table columns={columnsOrder} dataSource={dataOrder} /></>,
              },
              {
                label: '我的地址',
                key: '3',
                children: <>
                  <Button type="primary" onClick={openAddAddrModal}>新增</Button>
                  <AddrModal vis={addrModalVisble} fn={openAddAddrModal}></AddrModal>
                  <Table columns={columnsAddr} dataSource={dataAddr} />
                </>,
              },
              {
                label: '支付账号',
                key: '4',
                children: <><Table columns={columnsPayAccount} dataSource={dataPayAccount} /></>,
              },
              {
                label: '账号管理',
                key: '5',
                children: <>
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="旧密码"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: '请输入旧密码!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="新密码"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入新密码!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      label="确认密码"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: '请再次输入新密码!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        修改密码
                      </Button>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >

                      <Button danger>账号注销</Button>
                    </Form.Item>

                  </Form>
                </>,
              },

            ]}
          />
        </Col>
      </Row>
    </div>
  )

}