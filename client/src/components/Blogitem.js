import React, { useContext } from "react";
import blogContext from "../context/blogs/blogContext";

const Blogitem = (props) => {
  const context = useContext(blogContext);
  const { deleteBlog } = context;
  const { blog, updateBlog } = props;
  const rslp = "../../uploads/";
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
        
          <div className="image-section">            
          <img src={rslp+blog.image} className="img-responsive" alt={blog.title} />
            <i className="fa-solid fa-trash-can mx-2 cursor-pointer" onClick={()=>{deleteBlog(blog._id); props.showAlert("Deleted Blog Successfully","success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer" onClick={()=>{updateBlog(blog)}}></i>
          </div>
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-text">{blog.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogitem;
