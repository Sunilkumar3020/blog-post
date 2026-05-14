import express from "express"
import { createBlog, getAllBlogs } from "../controllers/blog.Controllers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router()
router.post('/create', protect, createBlog)
router.get('/all', getAllBlogs)
export default router;