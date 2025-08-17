import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import axios from 'axios';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
        const url = `http://localhost:8080${endpoint}`;
        const payload = { username, password };

        try {
            await axios.post(url, payload);

            if (isLogin) {
                navigate("/chat");
            } else {
                setIsLogin(true);
                alert("Signup successful! Please log in.");
            }
        } catch (err) {
            
            let message = "An error occurred. Please try again.";
            if (err.response && err.response.data) {
                // If the response data is an object with a message/error property, use that.
                if (typeof err.response.data === 'object') {
                    message = err.response.data.message || err.response.data.error || "Login failed.";
                }
                
                else if (typeof err.response.data === 'string') {
                    message = err.response.data;
                }
            }
            setError(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="left-panel">
                <h1 className="title-3d">MIZU GADO</h1>
            </div>

            <div className="auth-container">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <button
                    type="button"
                    className="switch-btn"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                    }}
                >
                    {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
                </button>
            </div>
        </div>
    );
}