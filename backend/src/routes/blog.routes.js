import express from "express"
import { createBlog, getAllBlogs } from "../controllers/blog.Controllers.js";

const router = express.Router()
router.get('/', getAllBlogs)
router.post('/', createBlog)
export default router;