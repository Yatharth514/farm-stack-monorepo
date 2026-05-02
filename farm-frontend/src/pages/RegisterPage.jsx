import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiClient from "../services/api";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/register', {
                
                email: email, 
                password: password
            });

            if (response.data && response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
                console.log("Token saved!");
            }

            alert("Registration successful!");
            
            navigate('/dashboard');

        } catch (error) {
            console.error("Registration failed!", error.response?.data || error.message);
            const detail = error.response?.data?.detail || "Registration failed.";
            alert(`Error: ${detail}`);
        }
    }; 

    
    return (
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ display: 'block', margin: '10px 0' }}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', margin: '10px 0' }}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;