import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../../Components/Navbar';
import styles from './styles.module.css'
import classes from '../../global-styles.module.css'
import { useNavigate } from 'react-router-dom'
import { axiosInstance1 } from '../../helpers/axios';

export default function AddPost() {
  const [value, setValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState()
  const [categories, setCategories] = useState()
  const [addCategoryFlag, setAddCategoryFlag] = useState(false)

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [categoryId, setCategoryId] = useState()
  const [imageURL, setImageURL] = useState()
  const navigate = useNavigate();

//   useEffect(() => {
//     console.log(value);
//   }, [value])
  
  useEffect(()=>{
    getLoginDetails();
    getCategories();
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

  async function getCategories(){
        await axiosInstance1.get('/category/show').then((d)=>{
        console.log(d.data);
        setCategories([...d.data,{"id":(d.data[d.data.length-1].id)+1,"category_name":"++ Add Category ++"}]);
        })
    }

async function postArticle(){
    console.log(categoryId)
    console.log(title)
    console.log(value);
    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

    axiosInstance1.post("/articles/addarticle",
    {
        title:title,
        content:value,
        category_id:categoryId,
        user_id:user.user.id,
        imageurl:imageURL
    },
    config).then((d)=>{
        console.log(d);
        navigate("/");
    }).catch((err)=>{
        alert(err)
    })
}
  return(
  <div className={styles.univ}>
    <Navbar/>
    <div className={styles.Head1}>
        <p>Post Article</p>
    </div>
    <div className={styles.Head2}>
        <p className={styles.addTitleText}>Article Title: </p>
        <input value={title} onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter the title of your article" className={classes.input_type1} style={{width:"360px"}}/>
    </div>
    <div className={styles.Head2}>
        <p className={styles.addTitleText}>Short Description: </p>
        <input value={desc} onChange={(e)=>setDesc(e.target.value)}
        placeholder="Enter the short description of article" className={classes.input_type1} style={{width:"360px"}}/>
    </div>
    <div className={styles.Head2}>
        <p className={styles.addTitleText}>Select Category</p>
        <select className={classes.input_type1}  onChange={(e)=>setCategoryId(e.target.value)}>
            {
                categories&&categories.map((c)=>{
                    return <option key={'cate'+c.id} value={c.id}>{c.category_name.substring(0,16)}</option>
                })
            }
            {/* <option onClick={()=>setAddCategoryFlag(true)}>Add Category +</option> */}
        </select>
    </div>
    {   addCategoryFlag&&
        <div  className={styles.Head2}>
            <p className={styles.addTitleText}>Add Category</p>
            <input placeholder="Enter category name" className={classes.input_type1} style={{width:"200px"}}/>
            <div>
            {
                    loggedIn?
                    <button className={classes.btn_type2}>Add Category</button>
                    :<button className={classes.btn_type2} onClick={()=>navigate("/auth/login")}>Signup</button>
                }
            </div>
        </div>
    }
    <div   className={styles.Head2} style={{height:"60vh"}} >
        <ReactQuill theme="snow" value={value} onChange={setValue} style={{height:"50vh"}} />
    </div>
    <div className={styles.Head2}>
        <p className={styles.addTitleText}>Image URL: </p>
        <input value={imageURL} onChange={(e)=>setImageURL(e.target.value)}
        placeholder="Paste Image URL here" className={classes.input_type1} style={{width:"360px"}}/>
    </div>
    <div  className={styles.Head2}>
        {
            loggedIn?
            <button className={classes.btn_type2} onClick={postArticle} style={{width:"100%",margin:"auto"}}>Post</button>
            :<button className={classes.btn_type2} onClick={()=>navigate("/auth/login")}  style={{width:"100%",margin:"auto"}}>Signup</button>
        }
    </div>
  </div>
  )
}
