function Toast({ message, type = "success" }) {
    if (!message) {
        return null;
    }

    return (
        <>
            <div className={`toast ${type}`}>
                {type === "success" ? "✅" : "❌"} {message}
            </div>

            <style>{`
                .toast {
                    position: fixed;
                    top: 80px;
                    right: 25px;
                    padding: 14px 20px;
                    border-radius: 8px;
                    color: white;
                    font-size: 14px;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }

                .toast.success {
                    background: #16a34a;
                }

                .toast.error {
                    background: #dc2626;
                }

                @media (max-width: 600px) {
                    .toast {
                        right: 15px;
                        left: 15px;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    );
}

export default Toast;