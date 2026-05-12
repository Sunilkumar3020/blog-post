import express from "express";
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import blogRouter from './routes/blog.routes.js'
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser({

}))

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/blogs', blogRouter)

app.get("/", (req, res) => {
    res.send("Welcome")
})
export default app;