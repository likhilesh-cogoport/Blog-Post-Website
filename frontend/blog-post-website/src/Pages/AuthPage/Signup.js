import React, { useState, useRef, useEffect } from 'react'
import CenterBox1 from '../../Components/CenterBox/CenterBox1'
import Navbar from '../../Components/Navbar'
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import CompanyLogo from '../../Components/CompanyLogo/CompanyLogo'
import  { useNavigate } from 'react-router-dom'
import { axiosInstance1 } from '../../helpers/axios'

export default function Signup() {

  const name = useRef()
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const navigate = useNavigate();

  // const dataFormat=["name","username","email","password","confirmPassword"]
  function attemptSignup(){
    console.log(name.current.value)
    console.log(username.current.value)
    console.log(email.current.value)
    console.log(password.current.value)
    console.log(confirmPassword.current.value)
    if(name.current.value.length==0 ||
      username.current.value.length==0 ||
      email.current.value.length==0 ||
      password.current.value.length==0 ||
      confirmPassword.current.value.length==0
      ){
        alert("All fields are mandatory")
        return ;
      }
    else if(password.current.value.length !== confirmPassword.current.value.length){
        alert("'Password' and 'Confirm Password' feilds do not match!")
        return ;
      }
    // dataFormat.forEach((d)=>{
    //   console.log(`${d}.current.value`);
    // })

    axiosInstance1.post("/signup",{
      name:name.current.value,
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
      confirmPassword:confirmPassword.current.value,
    }).then((d)=>{
      console.log(d);
      // localStorage.setItem("user",JSON.stringify(d.data));
      navigate("/auth/login");
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
            <p className={styles.signupText}>Sign up</p>
            <p className={styles.readFreeText}>Read 2 articles for free</p>
            {/* <form className={styles.formContainer} method="post" action="http://172.25.26.224:3000/signup"> */}
            <div className={styles.formContainer}>
              <p className={styles.inputLabelType1}>Name*</p>
              <input ref={name} type="text" name="name" placeholder="Enter your name" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType1}>Username*</p>
              <input ref={username} type="text" name="username"placeholder="Enter your name" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType1}>Email*</p>
              <input ref={email} type="email" name="email" placeholder="Enter your email" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType1}>Password*</p>
              <input ref={password} type="password" name="password" placeholder="Enter your password" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType1}>Confirm Password*</p>
              <input ref={confirmPassword} type="password" placeholder="Confirm your password" className={`${classes.input_type1} ${styles.input_type1}`} required/>
              <p className={styles.inputLabelType2}>Must be atleast 8 characters</p>
              <button className={classes.btn_type3} style={{margin:'14px 0 0 0'}} onClick={attemptSignup}>Get Started</button>
            </div>
            {/* </form> */}
            <div className={classes.flex_cc}>
              <p className={styles.alreadyHaveAccountText}>Already have an account?</p>
              <p className={styles.loginText} onClick={()=>navigate(`/auth/login`)}>Log in</p>
            </div>
          </div>
        </CenterBox1>
    </div>
  )
}
