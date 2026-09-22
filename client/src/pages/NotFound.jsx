import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
                .not-found {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f5f7fb;
                    text-align: center;
                    padding: 20px;
                }

                .not-found-box {
                    background: white;
                    padding: 45px;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                    max-width: 450px;
                }

                .not-found h1 {
                    font-size: 80px;
                    margin: 0;
                    color: #2563eb;
                }

                .not-found h2 {
                    margin: 10px 0;
                    color: #111827;
                }

                .not-found p {
                    color: #6b7280;
                    margin-bottom: 25px;
                }

                .home-btn {
                    border: none;
                    background: #2563eb;
                    color: white;
                    padding: 11px 20px;
                    border-radius: 7px;
                    cursor: pointer;
                    font-weight: bold;
                }

                .home-btn:hover {
                    background: #1d4ed8;
                }
            `}</style>

            <div className="not-found">
                <div className="not-found-box">

                    <h1>404</h1><br/>
                    <h2>Page Not Found</h2>

                    <p>
                        Sorry, the page you are looking for does not exist.
                    </p>

                    <button
                        className="home-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Go to Dashboard
                    </button>

                </div>
            </div>
        </>
    );
}

export default NotFound;