import React from 'react'
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import { GiAbstract079 } from 'react-icons/gi'
import {RxHamburgerMenu, RxOpenInNewWindow} from 'react-icons/rx'
import CompanyLogo from '../CompanyLogo/CompanyLogo'

export default function SubscribeBar1() {
  return (
    <div className={styles.middle_container}>
        <p style={{paddingLeft:'0px',fontSize:'18px',color:'#7F56D9',fontWeight:'600'}}>
            Subscribe for upcoming Articles</p><br/>
        {/* <div className={styles.company_block} style={{zoom:'2',paddingLeft:'10px'}}>
            <GiAbstract079/>Articles<sup style={{zoom:'0.6'}}>.web3</sup>
        </div> */}
        <div style={{zoom:"2"}}>
          <CompanyLogo/>
        </div>
        <p style={{padding:'20px 0 20px 0px'}}>Tool and strategies modern developers need to help their companies grow.</p>
        <div className={styles.email_box}>
            <input placeholder='Enter your email' type="email" className={`${classes.input_type1} ${styles.search_box2}`} style={{margin:'0 20px 10px 0'}}/>
            <button className={classes.btn_type2} style={{padding:'8px 10px', height:'fit-content'}}>Subscribe</button>
        </div>
    </div>
  )
}
