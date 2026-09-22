import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Email validation
    if (!email) {
        setError("Please enter your email");
        return;
    }

    if (!email.includes("@")) {
        setError("Please enter a valid email");
        return;
    }

    // Password validation
    if (!password) {
        setError("Please enter your password");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }

    setLoading(true);

    try {
        const response = await api.post("/auth/login", {
            email,
            password
        });

        login(response.data.user, response.data.token);

        if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("rememberMe");
        }

        navigate("/dashboard");

    } catch (error) {

        if (error.response) {
            setError(
                error.response.data.message ||
                "Login failed"
            );
        } else if (error.request) {
            setError(
                "Unable to connect to server. Please try again."
            );
        } else {
            setError("Something went wrong");
        }

    } finally {
        setLoading(false);
    }
};

    return (
        <>
            <style>{`

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: #f5f7fb;
                }

                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .login-box {
                    width: 900px;
                    max-width: 100%;
                    display: flex;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 25px #ddd;
                }

                .login-left {
                    width: 45%;
                    padding: 50px 40px;
                    background: #4f46e5;
                    color: white;
                }

                .login-left h1 {
                    margin-top: 70px;
                    font-size: 36px;
                }

                .login-left p {
                    line-height: 1.6;
                    color: #e0e7ff;
                }

                .login-left ul {
                    padding: 0;
                    list-style: none;
                    margin-top: 30px;
                }

                .login-left li {
                    margin: 15px 0;
                }

                .login-right {
                    width: 55%;
                    padding: 50px;
                }

                .login-right h2 {
                    margin-bottom: 8px;
                    color: #222;
                }

                .subtitle {
                    color: #777;
                    margin-bottom: 30px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 7px;
                    font-size: 14px;
                    font-weight: bold;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 14px;
                    outline: none;
                }

                .form-group input:focus {
                    border-color: #4f46e5;
                }

                .password-box {
                    position: relative;
                }

                .password-box input {
                    padding-right: 70px;
                }

                .show-btn {
                    position: absolute;
                    right: 8px;
                    top: 7px;
                    border: none;
                    background: none;
                    color: #4f46e5;
                    cursor: pointer;
                }

                .remember {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 14px;
                    margin-bottom: 20px;
                }

                .remember input {
                    width: auto;
                }

                .error {
                    padding: 10px;
                    margin-bottom: 20px;
                    background: #fee2e2;
                    color: #b91c1c;
                    border-radius: 6px;
                    font-size: 14px;
                }

                .login-btn {
                    width: 100%;
                    padding: 13px;
                    border: none;
                    border-radius: 6px;
                    background: #4f46e5;
                    color: white;
                    font-size: 15px;
                    font-weight: bold;
                    cursor: pointer;
                }

                .login-btn:hover {
                    background: #4338ca;
                }

                .login-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .register {
                    text-align: center;
                    margin-top: 25px;
                    color: #666;
                    font-size: 14px;
                }

                .register button {
                    border: none;
                    background: none;
                    color: #4f46e5;
                    font-weight: bold;
                    cursor: pointer;
                }

                @media (max-width: 700px) {

                    .login-box {
                        display: block;
                    }

                    .login-left,
                    .login-right {
                        width: 100%;
                    }

                    .login-left {
                        padding: 30px;
                    }

                    .login-left h1 {
                        margin-top: 20px;
                        font-size: 28px;
                    }

                    .login-right {
                        padding: 30px;
                    }

                }

            `}</style>

            <div className="login-page">

                <div className="login-box">

                    {/* Left side */}

                    <div className="login-left">

                        <h2>TaskFlow</h2>

                        <h1>
                            Manage your work.
                            <br/><br/>
                            Achieve more.
                        </h1>

                        <p>
                            Organize your tasks, track your progress
                            and stay productive.
                        </p>

                        <ul>
                            <li>✓ Easy task management</li>
                            <li>✓ Track task progress</li>
                            <li>✓ Stay organized</li>
                        </ul>

                    </div>

                    {/* Right side */}

                    <div className="login-right">

                        <h2>Welcome Back 👋</h2>

                        <p className="subtitle">
                            Login to continue to your dashboard.
                        </p>

                        {error && (
                            <div className="error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>

                            <div className="form-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Password</label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="show-btn"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>

                            <label className="remember">

                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(
                                            e.target.checked
                                        )
                                    }
                                />

                                Remember me

                            </label>

                            <button
                                className="login-btn"
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}
                            </button>

                        </form>

                        <div className="register">

                            Don't have an account?

                            <button
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Create Account
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;