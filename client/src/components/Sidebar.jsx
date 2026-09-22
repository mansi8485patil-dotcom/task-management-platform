import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
                .sidebar {
                    width: 220px;
                    min-height: calc(100vh - 65px);
                    background: #111827;
                    padding: 25px 15px;
                    box-sizing: border-box;
                }

                .sidebar-title {
                    color: #9ca3af;
                    font-size: 12px;
                    margin-bottom: 15px;
                    padding-left: 10px;
                    text-transform: uppercase;
                }

                .sidebar-btn {
                    width: 100%;
                    border: none;
                    background: transparent;
                    color: #d1d5db;
                    padding: 12px;
                    margin-bottom: 8px;
                    border-radius: 7px;
                    text-align: left;
                    cursor: pointer;
                    font-size: 15px;
                }

                .sidebar-btn:hover {
                    background: #1f2937;
                    color: white;
                }

                @media (max-width: 700px) {
                    .sidebar {
                        width: 100%;
                        min-height: auto;
                        display: flex;
                        gap: 8px;
                        padding: 10px;
                    }

                    .sidebar-title {
                        display: none;
                    }

                    .sidebar-btn {
                        margin: 0;
                    }
                }
            `}</style>

            <aside className="sidebar">

                <div className="sidebar-title">
                    Menu
                </div>

                <button
                    className="sidebar-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    🏠 Dashboard
                </button>

                <button
                    className="sidebar-btn"
                    onClick={() => window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth"
                    })}
                >
                    📋 Tasks
                </button>

            </aside>
        </>
    );
}

export default Sidebar;