import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

   const handleLogout = () => {
    logout();
    navigate("/login");
};

    return (
        <>
            <style>{`
                .navbar {
                    height: 65px;
                    background: white;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 30px;
                }

                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #2563eb;
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .user-info {
                    text-align: right;
                }

                .user-name {
                    font-weight: bold;
                    color: #111827;
                }

                .user-role {
                    font-size: 12px;
                    color: #6b7280;
                }

                .logout-btn {
                    border: none;
                    background: #ef4444;
                    color: white;
                    padding: 9px 16px;
                    border-radius: 7px;
                    cursor: pointer;
                    font-weight: bold;
                }

                .logout-btn:hover {
                    background: #dc2626;
                }
            `}</style>

            <nav className="navbar">
                <div className="logo">
                    TaskFlow
                </div>

                <div className="nav-right">

                    <div className="user-info">
                        <div className="user-name">
                            {user?.name || "User"}
                        </div>

                        <div className="user-role">
                            {user?.role || "User"}
                        </div>
                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </nav>
        </>
    );
}

export default Navbar;