import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import blogRoutes from './routes/blog.routes.js'
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/blogs', blogRoutes)

app.get("/", (req, res) => {
    res.send("Welcome")
})
export default app;