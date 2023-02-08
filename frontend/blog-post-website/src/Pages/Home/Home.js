import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import { GiAbstract079 } from 'react-icons/gi'
import {RxHamburgerMenu, RxOpenInNewWindow} from 'react-icons/rx'
import {AiOutlineLike,AiTwotoneLike} from 'react-icons/ai'
import {HiOutlineShare,HiShare} from 'react-icons/hi'
import { axiosInstance1 } from '../../helpers/axios'
import  { useNavigate } from 'react-router-dom'
import SubscribeBar1 from '../../Components/SubscribeBar1/SubscribeBar1'

export default function Home() {

    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState()
    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
        getArticles()
        getLoginDetails()
    }, [])
    
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

    async function getCategories(){
        await axiosInstance1.get('/category/show').then((d)=>{
          console.log(d.data);
          setCategories(d.data);
        })
    }

    async function getArticles(){
        await axiosInstance1.get('/articles/show').then((d)=>{
          console.log(d.data);
          setArticles(d.data);
        })
    }

    function gotoDetialsPage(data){
        // Redirect('/article/123');
        // return <Navigate to="/article/123" replace={true} />
        console.log(data)
        if(loggedIn){
            navigate(`/article/${data.id}`);
        }
        else{
            alert("Please login to see the article!");
            navigate(`/auth/login`);
        }
    }
    
  return (
    <div className={styles.univ}>
        <Navbar/>
        {/* <div className={styles.middle_container}>
            <p style={{paddingLeft:'0px',fontSize:'18px',color:'#7F56D9',fontWeight:'600'}}>
                Subscribe for upcoming Articles</p><br/>
            <div className={styles.company_block} style={{zoom:'2',paddingLeft:'10px'}}>
                <GiAbstract079/>Articles<sup style={{zoom:'0.6'}}>.web3</sup>
            </div>
            <p style={{padding:'20px 0 20px 0px'}}>Tool and strategies modern developers need to help their companies grow.</p>
            <div className={styles.email_box}>
                <input placeholder='Enter your email' type="email" className={classes.input_type1} style={{width:'360px',margin:'0 20px 10px 0'}}/>
                <button className={classes.btn_type2} style={{padding:'8px 10px', height:'fit-content'}}>Get Started</button>
            </div>
        </div> */}
        <SubscribeBar1/>
        <div className={styles.blogsContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.searchContainer}>
                    <p style={{paddingLeft:'0px',fontSize:'18px',color:'#7F56D9',fontWeight:'600'}}>
                    Search using filters</p><br/>
                    <input placeholder='Search Articles' className={`${classes.input_type1} ${styles.input_searchbox1}`}
                    style={{padding:'4px', marginBottom:'20px'}}
                    />
                    <div>
                        <select className={styles.selectorType1}>
                            <option>all</option>
                            {/* <option>python</option>
                            <option>html,css,js</option>
                            <option>react</option> */}
                            {
                                categories&&categories.map((c)=>{
                                    return <option key={'cate'+c.id}>{c.category_name.substring(0,16)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <select className={styles.selectorType1}>
                            <option>Likhilesh</option>
                            <option>Vasu</option>
                            <option>Hemanth</option>
                            <option>Himanshu</option>
                        </select>
                    </div>
                    <div>
                        <button className={classes.btn_type2} 
                        style={{padding:'4px 10px', height:'fit-content'}}
                        >Search</button>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                {
                    articles&&articles.length>0&&
                    articles.map((article)=>{
                        return(
                            <div key={'article-card'+article.id} className={styles.cards}>
                                {
                                    article.imageurl?
                                    <img src={`${"images/imageimg1.png"}`} onClick={()=>gotoDetialsPage(article)}  title="view More" className={styles.cardImage}/>
                                    :<img src={article.imageurl} onClick={()=>gotoDetialsPage(article)}  title="view More" className={styles.cardImage}/>
                                }
                                <div className={styles.cardData}>
                                    <p className={styles.cardTitle}>{article.title}</p>
                                    <p className={styles.cardContentText}>{article?.desc?.substring(0,72)}{" ..."}</p>
                                    <div className={styles.interactionBar}>
                                        <div className={styles.logoBtn1}>
                                            <div className={styles.logoDisp11}>
                                                <AiOutlineLike/>
                                            </div>
                                            <div className={styles.logoDisp12}>
                                                <AiTwotoneLike/>
                                            </div>
                                        </div>
                                        <button onClick={()=>gotoDetialsPage(article)} className={classes.btn_type1} style={{zoom:'0.8'}}>Comment</button>
                                        <div className={styles.logoBtn2}>
                                            <div className={styles.logoDisp21}>
                                                <HiOutlineShare/>
                                            </div>
                                            <div className={styles.logoDisp22}>
                                                <HiShare/>
                                            </div>
                                        </div>
                                        <button onClick={()=>gotoDetialsPage(article)} className={classes.btn_type2} style={{zoom:'0.75',margin:'5px auto'}}>
                                            Read More&nbsp;
                                            <RxOpenInNewWindow/>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
