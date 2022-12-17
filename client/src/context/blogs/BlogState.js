import { useState } from "react";
import blogContext from "./blogContext";

const BlogState = (props)=>{
  const host = "https://spkrapp.herokuapp.com";
  const blogsInitial = []  
  const [blogs, setBlogs] = useState(blogsInitial);

   // Fetch all blogs
   const getBlogs = async ()=>{
    const response = await fetch(`${host}/api/blogs/fetchallblogs`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    console.log(json);
    setBlogs(json);
  }

  // Add a blog
  const addBlog = async (title, description, image, category)=>{
    // API Call
    const response = await fetch(`${host}/api/blogs/addblog`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },    
      body: JSON.stringify({title, description, image, category}) 
    });
    const json = await response.json(); 
    console.log(json);    
    setBlogs(blogs.concat(json))
  }

  // Edit a blog
 const editBlog = async (id, title, description, image, category)=>{
    // API Call
    const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },    
      body: JSON.stringify({title, description, image, category}) 
    });
    const json = await response.json(); 
    console.log(json);

    let newBlogs = JSON.parse(JSON.stringify(blogs));
    // Logic to edit in client
      for (let index = 0; index < newBlogs.length; index++) {
        const element = newBlogs[index];
        if(element._id === id){
          newBlogs[index].title = title;
          newBlogs[index].description = description;
          newBlogs[index].image = image;
          newBlogs[index].category = category;
          break;
        }      
      }
      setBlogs(newBlogs);
  }

  // Delete a note
  const deleteBlog = async (id)=>{
    let confirmStatus = window.confirm("Are you sure?");     
    if(confirmStatus === true){
     // API Call
      const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
        method: 'DELETE',   
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } 
      });
      const json = await response.json();
      console.log(json);

      console.log("Deleting the blog with id " + id);
      // Client side
      const newBlogs = blogs.filter((blog)=>{return blog._id !== id})
      setBlogs(newBlogs);
    }
  }

  return (
      <blogContext.Provider value={{blogs, addBlog, editBlog, deleteBlog, getBlogs}}>
          {props.children}
      </blogContext.Provider>
  )
}
export default BlogState;