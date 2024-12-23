import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate the credentials (you can replace this with an API call)
        if (username === 'admin' && password === 'password') {
            // Redirect to profile page if login is successful
            navigate('/profile');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="box">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <h2>Log in</h2>
                    <div className="inputBox">
                        <input 
                            type="text" 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <a href="#">Forgot Password?</a>
                        <Link to='/signup'>
                            <a href="#">Signup</a>
                        </Link>
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </React.Fragment>
    );
}

export default Login;
