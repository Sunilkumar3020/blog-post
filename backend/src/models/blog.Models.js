import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    description: String
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)
export default Blog