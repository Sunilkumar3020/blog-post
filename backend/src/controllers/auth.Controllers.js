import User from "../models/user.Models.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
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

        // const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JSONWEBTOKEN_SECRET, { expiresIn: "1h" })



        res.status(201).json({ success: true, message: "User created successfully", data: { newUser } })



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
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }
        //token generates
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({ success: true, accessToken, message: "User get successfully", user: { id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "server error" })
    }
}


export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No refresh token" });

        }

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }

        const accessToken = generateAccessToken(user._id)
        res.status(200).json({ accessToken })
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: "Refresh token expired" })
    }
}


