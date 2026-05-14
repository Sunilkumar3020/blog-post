import { useState } from "react"
import API from "../api/axios"



export default function Login() {
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    const handleInputChange = e => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            const response = await API.post('/auth/login', formData)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={formData.name} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleInputChange} />
                <button type="submit"  >Login</button>
            </form>
        </>
    )
}