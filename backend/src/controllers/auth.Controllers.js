import User from "../models/user.Models.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
// register user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check fields 

        if (!name || !email || !password) {
            return res.status(401).json({ success: false, message: "All Fields are required." })
        }

        // check user exist or not

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exist" })
        }

        // hashPassword
        const hashPassword = await bcrypt.hash(password, 10)
        // create new User 

        const newUser = await User.create({ name, email, password: hashPassword })

        // token generate

        const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JSONWEBTOKEN_SECRET, { expiresIn: "1h" })

        res.status(201).json({ success: true, message: "User created successfully", data: { token, newUser } })



    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "server error" })
    }
}

// login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ success: false, message: "All fields are required" })
        }
        // check user exist or not
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }
        const token = await jsonwebtoken.sign({ id: user._id }, process.env.JSONWEBTOKEN_SECRET, { expiresIn: "1h" })
        res.status(200).json({ success: true, message: "User get successfully", data: { token, user } })
    } catch (error) {
        console.error(error);
        // res.status(500).json({ success: false, message: "server error" })
    }
}