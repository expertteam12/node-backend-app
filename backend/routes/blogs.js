const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blog");

// ROUTE 1: Get all the blogs using: GET "/api/blogs/fetchallblogs". Login required

router.get("/fetchallblogs", fetchuser, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2 : Add a new blog using: POST "/api/blogs/addblog". Login required

router.post(
  "/addblog",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body("description", "Description must be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, image, category } = req.body;
      // If there are errors, return Bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const blog = new Blog({
        title,
        description,
        image,
        category,
        user: req.user.id,
      });
      blog.image = blog.image.replace(/C:\\fakepath\\/i, '');
      const savedBlog = await blog.save();
      res.json(savedBlog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing Blog using: PUT "/api/blogs/updateblog". Login required
router.put("/updateblog/:id", fetchuser, async (req, res) => {
  const { title, description, image, category } = req.body;
  try {
    // Create a newBlog object
    const newBlog = {};
    if (title) {
        newBlog.title = title;
    }
    if (description) {
        newBlog.description = description;
    }
    if(image){
        newBlog.image = image;
    }
    if (category) {
        newBlog.category = category;
    }
    // Find the blog to be updated and update it
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).send("Not found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(404).send("Not allowed");
    }
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      { new: true }
    );
    res.send({ blog });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Delete an existing Note using: Delete "/api/notes/deletenote". Login required
router.delete("/deleteblog/:id", fetchuser, async (req, res) => {  
  try {
    // Find the not to be delete and delete it
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).send("Not found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndDelete(req.params.id);
    res.send({ success: "Blog has been deleted", blog: blog });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
