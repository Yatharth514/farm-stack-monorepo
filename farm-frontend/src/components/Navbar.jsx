import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useAuth();
    
    return (
        <nav style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
            {token ? (
                <div>
                    <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/" style={{ marginRight: '15px' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;