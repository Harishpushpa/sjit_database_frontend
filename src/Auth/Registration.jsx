import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Registration.css"; // Import the CSS file

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const usersenddata = { email, password };

        try {
            const response = await fetch("https://placeme-database-backend.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usersenddata),
            });

            const data = await response.json();

            if (!response.ok) {
                // 👉 Show backend error directly
                setError(data.message || "Registration failed");
                return;
            }

            // 👉 On success
            setMessage(data.message);
            setEmail("");
            setPassword("");

            // 👉 Navigate to login after short delay
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Account</h2>

                {/* 👉 Display success or error message */}
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="toggle-password">
                        <label>Show Password</label>
                        <div 
                            className={`toggle-switch ${showPassword ? "active" : ""}`}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <div className="toggle-slider"></div>
                        </div>
                    </div>
                    <button type="submit" className="btn-register">Register</button>
                </form>
                
                <p className="login-text">
                    Already have an account? 
                    <span onClick={() => navigate('/login')} className="login-link"> Login</span>
                </p>
            </div>
        </div>
    );
};

export default Registration;
