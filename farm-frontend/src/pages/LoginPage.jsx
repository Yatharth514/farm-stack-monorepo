import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        
        
        try {
            const response = await apiClient.post('/auth/login', {  email, password });
            const newToken = response.data.access_token;
            
            login(newToken); 
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Login failed!",error);
            alert("Wrong credentials!");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;