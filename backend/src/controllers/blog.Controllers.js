
import Blog from "../models/blog.Models.js";

// create blog
export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(401).json({ success: false, message: "All fields are required" })
        }

        const blog = await Blog.create({ title, description, author: req.user._id })
        res.status(201).json({ success: true, message: "Blog created successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "server error" })
    }
}

// getAllBlogs 

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email")
        res.status(200).json({ success: true, message: "Getting all blogs ", data: blogs })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "server error" })
    }
}