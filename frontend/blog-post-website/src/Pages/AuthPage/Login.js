import React, { useRef, useState } from 'react'
import CenterBox1 from '../../Components/CenterBox/CenterBox1'
import Navbar from '../../Components/Navbar'
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import CompanyLogo from '../../Components/CompanyLogo/CompanyLogo'
import  { useNavigate } from 'react-router-dom'
import { axiosInstance1 } from '../../helpers/axios'


export default function Login() {

  const email = useRef()
  const password = useRef()
  const navigate = useNavigate();

  function attemptLogin(){
    console.log(email.current.value)
    console.log(password.current.value)
    axiosInstance1.post("/auth/login",{
      email:email.current.value,
      password:password.current.value
    }).then((d)=>{
      console.log(d);
      localStorage.setItem("user",JSON.stringify(d.data));
      navigate("/");
    }).catch((err)=>{
      console.log(err);
      alert("Network error:",err);
    })
  }
  
  return (
    <div className={styles.univ}>
        <Navbar/>
        <CenterBox1>
          <div className={styles.signupContainer}>
            <div style={{zoom:"1.5"}}>
              <CompanyLogo />
            </div>
            <p className={styles.signupText}>Login</p>
            <p className={styles.readFreeText}>Welcome back! Please enter your details.</p>
            {/* <form className={styles.formContainer} method="post" action="http://172.25.26.224:3000/auth/login"> */}
            <div className={styles.formContainer}>
              {/* <p className={styles.inputLabelType1}>Name*</p>
              <input type="text" placeholder="Enter your name" className={`${classes.input_type1} ${styles.input_type1}`} required/> */}
              <p className={styles.inputLabelType1}>Email*</p>
              <input ref={email} name="email" type="text" placeholder="Enter your email" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType1} >Password*</p>
              <input ref={password} name="password" type="password" placeholder="Enter your password" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              {/* <p className={styles.inputLabelType1}>Confirm Password*</p>
              <input type="password" placeholder="Confirm your password" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType2}>Must be atleast 8 characters</p> */}
              <div className={styles.forgotPasswordDiv}>
                <div style={{display:'flex',alignItems:'baseline'}}>
                  <input id="checkbox1" type="checkbox" style={{border:'1px solid #D0D5DD'}}/>&nbsp;
                  <label htmlFor="checkbox1" >Remember for 30 days</label>
                </div>
                <p className={styles.forgotPassword}>Forgot&nbsp;Password</p>
              </div>
              <button className={classes.btn_type3} onClick={attemptLogin} style={{margin:'14px 0 0 0'}}>Sign in</button>
            </div>
            {/* </form> */}
            <div className={classes.flex_cc}>
              <p className={styles.alreadyHaveAccountText}>Don't have an account?</p>
              <p className={styles.loginText} onClick={()=>navigate(`/auth/signup`)}>Sign up</p>
            </div>
          </div>
        </CenterBox1>
    </div>
  )
}
