import { configDotenv } from "dotenv"
import connectDB from "./src/config/db.js"
import app from "./src/app.js";
configDotenv({ path: "./.env" })

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_STRING

const startServer = async () => {
    try {
        await connectDB(MONGODB_URL)
        app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}

startServer()