import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim()) {
    setError("Please enter your name");
    return;
}

if (!email.trim()) {
    setError("Please enter your email");
    return;
}

if (!email.includes("@")) {
    setError("Please enter a valid email");
    return;
}

        setLoading(true);

        try {
            await api.post("/auth/register", {
                name,
                email,
                password
            });

            setSuccess("Registration successful! Redirecting...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Registration failed"
            );
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

                .register-page {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                .register-box {
                    width: 900px;
                    max-width: 100%;
                    display: flex;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 25px #ddd;
                }

                .register-left {
                    width: 45%;
                    padding: 50px 40px;
                    background: #4f46e5;
                    color: white;
                }

                .register-left h1 {
                    margin-top: 70px;
                    font-size: 36px;
                }

                .register-left p {
                    color: #e0e7ff;
                    line-height: 1.6;
                }

                .register-left ul {
                    list-style: none;
                    padding: 0;
                    margin-top: 30px;
                }

                .register-left li {
                    margin: 15px 0;
                }

                .register-right {
                    width: 55%;
                    padding: 45px 50px;
                }

                .register-right h2 {
                    margin-bottom: 8px;
                    color: #222;
                }

                .subtitle {
                    color: #777;
                    margin-bottom: 25px;
                }

                .form-group {
                    margin-bottom: 17px;
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
                    padding-right: 65px;
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

                .error {
                    padding: 10px;
                    margin-bottom: 18px;
                    background: #fee2e2;
                    color: #b91c1c;
                    border-radius: 6px;
                    font-size: 14px;
                }

                .success {
                    padding: 10px;
                    margin-bottom: 18px;
                    background: #dcfce7;
                    color: #15803d;
                    border-radius: 6px;
                    font-size: 14px;
                }

                .password-hint {
                    font-size: 12px;
                    color: #888;
                    margin-bottom: 18px;
                }

                .register-btn {
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

                .register-btn:hover {
                    background: #4338ca;
                }

                .register-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .login-link {
                    text-align: center;
                    margin-top: 22px;
                    color: #666;
                    font-size: 14px;
                }

                .login-link button {
                    border: none;
                    background: none;
                    color: #4f46e5;
                    font-weight: bold;
                    cursor: pointer;
                }

                @media (max-width: 700px) {

                    .register-box {
                        display: block;
                    }

                    .register-left,
                    .register-right {
                        width: 100%;
                    }

                    .register-left {
                        padding: 30px;
                    }

                    .register-left h1 {
                        margin-top: 20px;
                        font-size: 28px;
                    }

                    .register-right {
                        padding: 30px;
                    }

                }

            `}</style>

            <div className="register-page">

                <div className="register-box">

                    {/* Left side */}

                    <div className="register-left">

                        <h2>TaskFlow</h2>

                        <h1>
                            Start managing
                            <br />
                            your tasks.
                        </h1>

                        <p>
                            Create your account and organize
                            your work easily.
                        </p>

                        <ul>
                            <li>✓ Create and manage tasks</li>
                            <li>✓ Track your progress</li>
                            <li>✓ Stay organized</li>
                        </ul>

                    </div>

                    {/* Right side */}

                    <div className="register-right">

                        <h2>Create Your Account ✨</h2>

                        <p className="subtitle">
                            Join TaskFlow and start managing your tasks.
                        </p>

                        {error && (
                            <div className="error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="success">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleRegister}>

                            {/* Name */}

                            <div className="form-group">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            {/* Email */}

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

                            {/* Password */}

                            <div className="form-group">

                                <label>Password</label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Minimum 6 characters"
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

                            {/* Confirm Password */}

                            <div className="form-group">

                                <label>Confirm Password</label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Re-enter password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="show-btn"
                                        onClick={() =>
                                            setShowConfirm(
                                                !showConfirm
                                            )
                                        }
                                    >
                                        {showConfirm
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>

                            <div className="password-hint">
                                Password must be at least 6 characters.
                            </div>

                            <button
                                type="submit"
                                className="register-btn"
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                        </form>

                        <div className="login-link">

                            Already have an account?

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Sign In
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;