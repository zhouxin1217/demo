import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Container,Navbar,Nav} from 'react-bootstrap'
import Personal from './personal';
import Changing from './Changing'
import {useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next";
const Header = (props) => {
let path=useLocation().pathname;
  const {t} = useTranslation();
  return (
    <header>
      <Navbar bg="dark"  variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>{path==='/pay'?t('order'):t('ShoppingMall')}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="collapse navbar-collapse text-right justify-content-end">
           
          <LinkContainer to='/cart'>
            <Nav.Link >
                <i  className='fas fa-shopping-cart'></i>
                {t('ShoppingCart')}
                </Nav.Link>
             </LinkContainer>
             {localStorage.getItem('username')!=='undefined'?(

              <Personal />
            
             ):(<LinkContainer to='/login'>
            <Nav.Link>
            <i  className='fas fa-user'></i>
            {t('signin')}
           
                </Nav.Link>
             </LinkContainer>
             )}
             <Changing/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
