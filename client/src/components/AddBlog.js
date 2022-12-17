import React, { useContext, useState } from "react";
import blogContext from "../context/blogs/blogContext";
import axios from 'axios';

const AddBlog = (props) => {
    const context = useContext(blogContext);
    const host = "https://spkrapp.herokuapp.com"; 
  const {addBlog} = context;
  const [blog, setBlog] = useState({title:"",description:"",image:"",category:""});
  const [image, setImage] = useState({selectedFile: null, // to store selected file
  handleResponse: null, // handle the API response
  imageUrl: null});
  const handleClick = (e)=>{
       e.preventDefault();
       addBlog(blog.title,blog.description,blog.image,blog.category);
       setBlog({title:"",description:"",image:"",category:""});

       /* ========== image ========== */
       const { selectedFile } = image;
     
    if (!selectedFile) {
      setImage({
        handleResponse: {
          isSuccess: false,
          message: "Please select image to upload."
        }
      });
      return false;
    }
   
    const formData = new FormData();
    formData.append('dataFile', selectedFile, selectedFile.name);
    axios.post(host + '/uploadfile', formData).then(response => {
      setImage({
        handleResponse: {
          isSuccess: response.status === 200,
          message: response.data.message
        },
        imageUrl: host + response.data.file.path
      });
    }).catch(err => {
      alert(err.message);
    });
       /* ========== image ======== */
       props.showAlert("Added blog Successfully","success");
  }
  const onChange = (e)=>{
     setBlog({...blog, [e.target.name]: e.target.value});
     if(e.target.name === 'image')
     setImage({selectedFile: e.target.files[0]});
  }
  
 
  return (
    <div className="container my-3">
      <h2>Add a Blog</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Post Title</label>
          <input type="text" className="form-control" id="title" name="title" value={blog.title} aria-describedby="emailHelp" onChange={onChange}/>          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"> Post Description </label>
          <textarea className="form-control" id="description" name="description" value={blog.description} onChange={onChange} ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Post Image</label>
          <input type="file" className="form-control" id="image" name="image" onChange={onChange}/>          
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="categories"> Post Category </label>
          <select name="category" className="form-control" onChange={onChange}>
            <option selected="selected" value="general">General</option>  
            <option value="news">News</option>  
          </select>          
        </div>
        <button disabled={blog.title.length < 5 || blog.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
