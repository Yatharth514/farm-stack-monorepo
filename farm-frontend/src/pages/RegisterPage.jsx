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
            await apiClient.post('/auth/register', { email, password });
            alert("Registration successful! Please log in.");
            navigate('/');

        } catch (error) {
            console.error("Registeration failed!");
            alert("Registration failed. That username might already be taken.");
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