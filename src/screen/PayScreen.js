import React from 'react'
import Step from '../component/Step'
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
const PayScreen = () => {
  const {t} = useTranslation();
  return (
    <div>
       <Link className='btn btn-dark my-3' to={`/?email=${localStorage.getItem('username')}`}>
         {t('GoHome')}
        </Link>
        <Step />
    </div>
  )
}

export default PayScreen
