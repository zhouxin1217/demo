import { Space,Table,Button,Input,message,Modal} from 'antd';

import { ExclamationCircleOutlined} from '@ant-design/icons';
import React from 'react'

import axios from 'axios';
// import Nav from '../../components/nav/nav'
// import './admin.css'
import Drawer1 from '../../component/drawer'
import Drawer2 from '../../component/editdrawer'
const { Search } = Input;
class Admin extends React.Component{
    
  constructor(props) {
    super(props);
    this.state={
      data:[]
  }
  
}

    columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'category',
        dataIndex: 'category',
        key: 'category',
      },
    
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'countInStock',
        dataIndex: 'countInStock',
        key: 'countInStock',
      },
      {
        title: 'Action',
        key: 'action',
        render: (props) => (
            <Space size="middle">
              <Drawer2 data={props}/>    
              <Button onClick={()=>this.delHandle(props)} type="dashed">Delete</Button>
            </Space>
          ),
      },
    ];
    getData=()=>{
        axios.get('/api/products',{
            headers:{
              "Content-Type":'application/json'
            }
          }).then((res)=>{
           console.log(res.data)
            this.setState({
                data:res.data
            })
          }).catch((err)=>{
               console.log(err)
          })
         
    }


    open=(props)=>{
      console.log(props)
    }
    
    
    //删除
     delHandle=(props)=>{
      console.log(props)
      Modal.confirm({
        title: 'Are you sure to delete?',
        icon: <ExclamationCircleOutlined/>,
        content: '',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
    
          axios.delete(`/goods/${props.id}`).then((res)=>{
            if(res.data.code===200){
              message.success('delete success')
              window.location.reload()
            }else{
              message.warning('delete error')
            }
        
            
          }).catch((err)=>{
            message.warning(err)
          })
          
        }
        ,
        onCancel() {
            console.log('Cancel');
        },
    });
    
     
    }

    upHandle=(props)=>{
      console.log(props)
    }
   
    //查询
    onSearch = (value) => {
       
        if(value===""){
             this.getData()
            return;
          
        }
      
        const obj=this.state.data.filter((item)=>item.name.indexOf(value)!==-1)
        this.setState({
            data:obj
        })
    }

   
  
    componentDidMount(){
        //发送axios请求
        this.getData()
    }
    render(){
        return(
            <div>
                <div className='content'>
                <Drawer1/>    
               
  <Search
      placeholder="input search alcohol name"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={this.onSearch}
      className="search"
    />
 </div>

 

 <Table columns={this.columns} dataSource={this.state.data} rowKey={record => record.alcohol_id}  />
 


 
 </div>
          
        )
    }
}

export default Admin;


