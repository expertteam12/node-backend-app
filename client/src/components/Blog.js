import React, { useContext, useEffect, useRef, useState } from "react";
import blogContext from "../context/blogs/blogContext";
import Blogitem from "./Blogitem";
import AddBlog from "./AddBlog";
import {useNavigate} from 'react-router-dom';

const Blogs = (props) => {
  const context = useContext(blogContext);
  console.log(context);
  let history = useNavigate();
  const {blogs, getBlogs, editBlog} = context;
  
  const [blog, setBlog] = useState({id:"",etitle:"",edescription:"",eimage:"",ecategory:""})

  useEffect(() => {
   if(localStorage.getItem('token')){
    getBlogs()
   }else{
     history("/login")
   } 
   
  // eslint-disable-next-line
  }, [])

   const ref = useRef(null);
   const refClose = useRef(null);
  const updateBlog = (currentBlog)=>{
    ref.current.click();
    setBlog({id:currentBlog._id, etitle:currentBlog.title, edescription:currentBlog.description, eimage:currentBlog.image, ecategory:currentBlog.category});
  }

 
  const handleClick = (e)=>{
       e.preventDefault();
       console.log("Updating the blog..."+ blog);
      editBlog(blog.id, blog.etitle, blog.edescription, blog.image, blog.category);
      refClose.current.click();
      props.showAlert("Updated Blog Successfully","success");
       
  }
  const onChange = (e)=>{
     setBlog({...blog, [e.target.name]: e.target.value})
  }
  
  return (
    <>
    <AddBlog showAlert={props.showAlert} />    
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>   
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={blog.etitle} aria-describedby="emailHelp" minLength={5} required onChange={onChange}/>          
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label"> Description </label>
              <textarea className="form-control" id="edescription" name="edescription"  value={blog.edescription} minLength={5} required onChange={onChange} ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Post Image</label>
              <input type="file" className="form-control" id="image" name="image" onChange={onChange}/>
              <img src={'../../uploads/'+blog.eimage} className="img-responsive my-3" alt={blog.title} />          
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="categories"> Post Category </label>
              <select name="category" className="form-control" onChange={onChange}>
                <option selected={ blog.ecategory ==='general'? 'selected':''} value="general">General</option>  
                <option selected={ blog.ecategory ==='news'? 'selected':''} value="news">News</option>  
              </select>          
            </div>
          </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={blog.etitle.length < 5 || blog.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
        <h2>Your Posts</h2>
        <div className="container mx-2">
        { blogs.length ===0 && 'No blogs to display'}
        </div>
        {blogs.map((blog) => {
          return <Blogitem key={blog._id} updateBlog={updateBlog} blog={blog} showAlert={props.showAlert}/>
        })}
      </div>
      </>
  )
}

export default Blogs