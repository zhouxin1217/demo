    import { Container } from "react-bootstrap";
    import { BrowserRouter,Routes,Route } from "react-router-dom";
    import Footer from "./component/Footer";
    import Header from "./component/Header";
    import './index.css'
    import HomeScreen from "./screen/HomeScreen";
    import ProductScreen from "./screen/ProductScreen";
    import CartScreen from "./screen/CartScreen"
    import PayScreen from "./screen/PayScreen"
    import Login from "./pages/login/login"
    import Register from './component/Register'
    import {useState} from 'react'
    import Admin from './pages/admin/admin'
    import Account from "./pages/account/index"
    import {ConfigProvider} from 'antd'
    import zhCN from 'antd/locale/zh_CN'
   
    function App() {
      let [email,setEmail]=useState(localStorage.getItem("username"))
      const getEmail=(str)=>{
         if(str!==''){
          setEmail(str)
         }
      }
    
      const getE=()=>{
        return email;
      }
     
      return (
        <ConfigProvider locale={zhCN}>
        <BrowserRouter>
        <Header  data={email}/>
        <main className='py-3'>
          <Container>
          <Routes>
         <Route path='/' element={ <HomeScreen getEmail={getEmail} />}  />
         <Route path='/products/:id'  element={ <ProductScreen  getEmail={getE}/>}  />
         <Route path='/cart' element={ <CartScreen getEmail={getE}/>}  />
         <Route path='/pay' element={ 
         <PayScreen />} 
         
         />
         <Route path='/login' element={ <Login />}  />
         <Route path='/register' element={ <Register />}  />
         <Route path='/admin' element={ <Admin />}  />
         <Route path='/account/center/:tabActiveKey' element={ <Account getEmail={getE}/>}  />
         <Route path='/account/center' element={ <Account getEmail={getE}/>}  />
         </Routes>
          </Container>
        </main>
        <Footer />
        </BrowserRouter>

        </ConfigProvider>


      );
    }
    
    export default App;
    
    