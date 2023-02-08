import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar';
import { axiosInstance1 } from '../../helpers/axios';
import styles from './styles.module.css';
import Moment from 'react-moment';
import { GiAbstract079 } from 'react-icons/gi'
import {RxHamburgerMenu, RxOpenInNewWindow,RxAvatar} from 'react-icons/rx'
import {AiOutlineLike,AiTwotoneLike} from 'react-icons/ai'
import {HiOutlineShare,HiShare} from 'react-icons/hi'
import  { useNavigate } from 'react-router-dom'
import classes from '../../global-styles.module.css'
import SubscribeBar1 from '../../Components/SubscribeBar1/SubscribeBar1';

export default function DisplayArticle() {
    let param = useParams();
    const [data, setData] = useState()
    const [category, setCategory] = useState();
    const [token, setToken] = useState();

    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };

    useEffect(() => {
      getLoginDetails()
    }, [])

    useEffect(() => {
      console.log(token);
      getArticle()
    }, [token])

    function getLoginDetails(){
        let data_temp = localStorage.getItem("user");
        if(data_temp){
          data_temp=JSON.parse(data_temp)
          if(data_temp?.token){
            setToken(data_temp.token)
          }
        }
    }
    async function getArticle(){
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axiosInstance1.get(`/articles/show/${param.id}`,config).then((d)=>{
        console.log(d.data)
        // d.data.updated_at=(new Date(d.data.updated_at.substring(0,10))).toLocaleString()
        d.data.updated_at=(new Date(d.data.updated_at.substring(0,10)))
        // console.log(d.data.updated_at)
        // console.log(d.data)
        // console.log(typeof(d.data))
        setData(d.data)
        getCategory(d.data.category_id);
      })
    }

    async function getCategory(x){
      await axiosInstance1.get(`/category/show/${x}`).then((d)=>{
        setCategory(d.data);
      });
    }
  return (
    <div className={styles.univ}>
        <Navbar/>
        <div className={styles.middleContainer1}>
            <p className={styles.headDate}>Updated On <Moment date={data?.updated_at} format="D MMM YYYY" /></p>
            {/* <p className={styles.headDate}>Updated On 7 Feb 2023</p> */}
            {/* <p className={styles.headTitle}>ReactJS</p> */}
            {/* <p className={styles.headText}>This is a sample text to be repalced by server response.</p> */}
            <p className={styles.headTitle}>{data?.title}</p>
            <p className={styles.headText}>{data?.titleText}</p>
            <p className={styles.headCategory}>{category?.category_name}</p>
        </div>
        {/* <div className={styles.mainImage}> */}
        <div className={styles.mainImageContainer}>
          {/* <img src={"../images/Imagebg1.png"} className={styles.mainImage} title="Display Image"/> */}
          {
            data?.imageurl?
            <img src={data?.imageurl} className={styles.mainImage} title="Display Image"/>
            :<img src={"../images/Imagebg1.png"} className={styles.mainImage} title="Display Image"/>
          }
        </div>

        <div className={styles.mainTextContainer}>
          {/* <p className={styles.mainText}>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.</p> */}
        <p className={styles.mainText}>{data?.content}</p>
        </div>
        <div className={styles.bottomBar1}>
          <div className={styles.bottomBar1_p1}>
            <RxAvatar style={{zoom:'1.7'}}/>
            <div style={{padding:"0 0 0 10px"}}>
              <p>Likhilesh</p>
              <p>17 Feb 2023</p>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.logoBtn1}>
                <div className={styles.logoDisp11}>
                    <AiOutlineLike/>
                </div>
                <div className={styles.logoDisp12}>
                    <AiTwotoneLike/>
                </div>
            </div>
            <button className={classes.btn_type1} style={{zoom:'0.8'}}>Comment</button>
            <div className={styles.logoBtn2}>
                <div className={styles.logoDisp21}>
                    <HiOutlineShare/>
                </div>
                <div className={styles.logoDisp22}>
                    <HiShare/>
                </div>
            </div>
            {/* <button className={classes.btn_type2} style={{zoom:'0.75'}}>
                Read More&nbsp;
                <RxOpenInNewWindow/>
            </button> */}
          </div>
        </div>
        <SubscribeBar1/>
        {/* </div> */}
    </div>
  )
}
