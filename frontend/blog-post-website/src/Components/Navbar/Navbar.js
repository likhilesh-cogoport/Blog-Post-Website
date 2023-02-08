import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import { GiAbstract079 } from 'react-icons/gi'
import {RxHamburgerMenu} from 'react-icons/rx'
import CompanyLogo from '../CompanyLogo/CompanyLogo'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [menuItems, setmenuItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn){
      setmenuItems([
        {
          name:"User",
          func:func1
        },
        {
          name:"Edit Profile",
          func:func2
        },
        {
          name:"My Articles",
          func:func3
        },
        {
          name:"Logout",
          func:logout
        }
      ])
    }
    else{
      setmenuItems([
        {
          name:"Guest",
          func:func1
        },
        {
          name:"Log in",
          func:func2
        }
      ])
    }
  }, [loggedIn]);

  useEffect(()=>{
    getLoginDetails();
  },[])

  useEffect(() => {
      if(user?.token){
          if(user.token?.length>0){
              setLoggedIn(true);
          }
      }
  }, [user])

  function getLoginDetails(){
      let data_temp = localStorage.getItem("user");
      if(data_temp){
          setUser(JSON.parse(data_temp));
      }
  }
  function func1(){
    console.log("func1");
  }
  function func2(){
    console.log("func2");
  }
  function func3(){
    console.log("func3");
  }
  function logout(){
    console.log("You logged out");
    localStorage.setItem("user","");
    navigate("/");
    getLoginDetails();
  }
  
  return (
    <div className={styles.univ}>
      <div className={styles.dsk_container}>
        <div className={styles.dsk_c_p1}>
          {/* <div className={styles.company_block}>
            <GiAbstract079/>Articles<sup>.web3</sup>
          </div> */}
          <CompanyLogo/>
          <div className={styles.dsk_c_p1_nav}>
            <div className={styles.dsk_nav_item1_inactive} onClick={()=>{navigate("/")}}>
              Home
            </div>
            <div className={styles.dsk_nav_item1_inactive} onClick={()=>{navigate("/add-post")}}>
              Create Article
            </div>
            <div className={styles.dsk_nav_item1_inactive} onClick={()=>{navigate("/")}}>
              Search Article
            </div>
          </div>
        </div>
        <div className={styles.dsk_c_p2}>
          {
            !loggedIn&&
            <>
              <button className={classes.btn_type1} style={{margin:'0 6px'}}>Log in</button>
              <button className={classes.btn_type2} style={{margin:'0 6px'}}>Sign up</button>
            </>
          }
          <div id={styles.hamburger} className={classes.btn_type1}><RxHamburgerMenu/>
            <div className={styles.menuBox}>
                    <button className={styles.menuItem_top} disabled={true}>
                      User
                    </button>
              {
                menuItems.map((m)=>{
                  return(
                    <button className={styles.menuItem} key={m.name} onClick={m.func}>
                      {m.name}
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
