import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load task"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/tasks/${id}`);

            alert("Task deleted successfully");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <h3>Loading Task Details...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />

                <div style={styles.errorPage}>

                    <div style={styles.errorIcon}>
                        ⚠
                    </div>

                    <h2>Unable to load task</h2>

                    <p>{error}</p>

                    <button
                        style={styles.backButton}
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>
            </>
        );
    }

    if (!task) {
        return (
            <>
                <Navbar />

                <div style={styles.errorPage}>

                    <div style={styles.errorIcon}>
                        📋
                    </div>

                    <h2>Task not found</h2>

                    <button
                        style={styles.backButton}
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                </div>
            </>
        );
    }

    return (
        <div style={styles.page}>

            <Navbar />

            <main style={styles.container}>

                {/* TOP NAVIGATION */}

                <div style={styles.topBar}>

                    <button
                        style={styles.backLink}
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                    <span style={styles.pageLabel}>
                        TASK DETAILS
                    </span>

                </div>


                {/* MAIN CARD */}

                <div style={styles.mainCard}>

                    {/* HEADER */}

                    <div style={styles.header}>

                        <div style={styles.headerLeft}>

                            <div style={styles.taskIcon}>
                                ✓
                            </div>

                            <div>

                                <p style={styles.overline}>
                                    TASK
                                </p>

                                <h1 style={styles.title}>
                                    {task.title}
                                </h1>

                            </div>

                        </div>


                        <div style={styles.badges}>

                            <span
                                style={getPriorityStyle(
                                    task.priority
                                )}
                            >
                                {task.priority} Priority
                            </span>

                            <span
                                style={getStatusStyle(
                                    task.status
                                )}
                            >
                                {task.status}
                            </span>

                        </div>

                    </div>


                    {/* DIVIDER */}

                    <div style={styles.divider}></div>


                    {/* DESCRIPTION */}

                    <section style={styles.descriptionSection}>

                        <h3 style={styles.sectionTitle}>
                            Description
                        </h3>

                        <p style={styles.description}>
                            {task.description}
                        </p>

                    </section>


                    {/* INFORMATION GRID */}

                    <div style={styles.infoGrid}>

                        {/* DUE DATE */}

                        <div style={styles.infoCard}>

                            <div style={{
                                ...styles.infoIcon,
                                backgroundColor: "#eef2ff"
                            }}>
                                📅
                            </div>

                            <div>

                                <span style={styles.infoLabel}>
                                    DUE DATE
                                </span>

                                <strong style={styles.infoValue}>
                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}
                                </strong>

                            </div>

                        </div>


                        {/* STATUS */}

                        <div style={styles.infoCard}>

                            <div style={{
                                ...styles.infoIcon,
                                backgroundColor: "#eff6ff"
                            }}>
                                🔄
                            </div>

                            <div>

                                <span style={styles.infoLabel}>
                                    STATUS
                                </span>

                                <strong style={styles.infoValue}>
                                    {task.status}
                                </strong>

                            </div>

                        </div>


                        {/* PRIORITY */}

                        <div style={styles.infoCard}>

                            <div style={{
                                ...styles.infoIcon,
                                backgroundColor: "#fff7ed"
                            }}>
                                ⚡
                            </div>

                            <div>

                                <span style={styles.infoLabel}>
                                    PRIORITY
                                </span>

                                <strong style={styles.infoValue}>
                                    {task.priority}
                                </strong>

                            </div>

                        </div>


                        {/* ASSIGNED USER */}

                        <div style={styles.infoCard}>

                            <div style={{
                                ...styles.infoIcon,
                                backgroundColor: "#ecfdf5"
                            }}>
                                👤
                            </div>

                            <div>

                                <span style={styles.infoLabel}>
                                    ASSIGNED TO
                                </span>

                                <strong style={styles.infoValue}>
                                    {task.assignedUser?.name ||
                                        "Unknown"}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ASSIGNED USER DETAILS */}

                    <section style={styles.userSection}>

                        <div style={styles.userAvatar}>
                            {task.assignedUser?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                        </div>

                        <div style={styles.userDetails}>

                            <span style={styles.userLabel}>
                                ASSIGNED USER
                            </span>

                            <h3 style={styles.userName}>
                                {task.assignedUser?.name ||
                                    "Unknown User"}
                            </h3>

                            <p style={styles.userEmail}>
                                {task.assignedUser?.email ||
                                    "No email available"}
                            </p>

                        </div>

                    </section>


                    {/* DATES */}

                    <div style={styles.datesSection}>

                        <div>

                            <span style={styles.dateLabel}>
                                CREATED
                            </span>

                            <span style={styles.dateValue}>
                                {task.createdAt
                                    ? new Date(
                                        task.createdAt
                                    ).toLocaleString(
                                        "en-IN"
                                    )
                                    : "N/A"}
                            </span>

                        </div>

                        <div>

                            <span style={styles.dateLabel}>
                                LAST UPDATED
                            </span>

                            <span style={styles.dateValue}>
                                {task.updatedAt
                                    ? new Date(
                                        task.updatedAt
                                    ).toLocaleString(
                                        "en-IN"
                                    )
                                    : "N/A"}
                            </span>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div style={styles.actions}>

                        <button
                            style={styles.backButtonLarge}
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            ← Back
                        </button>

                        <button
                            style={styles.editButton}
                            onClick={() =>
                                navigate(`/tasks/${task._id}/edit`)
                            }
                        >
                            ✏ Edit Task
                        </button>

                        <button
                            style={styles.deleteButton}
                            onClick={handleDelete}
                        >
                            🗑 Delete Task
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}


/* =========================
   PRIORITY STYLE
========================= */

function getPriorityStyle(priority) {

    if (priority === "High") {
        return {
            ...styles.badge,
            backgroundColor: "#fee2e2",
            color: "#b91c1c"
        };
    }

    if (priority === "Medium") {
        return {
            ...styles.badge,
            backgroundColor: "#fef3c7",
            color: "#92400e"
        };
    }

    return {
        ...styles.badge,
        backgroundColor: "#dcfce7",
        color: "#166534"
    };
}


/* =========================
   STATUS STYLE
========================= */

function getStatusStyle(status) {

    if (status === "Completed") {
        return {
            ...styles.badge,
            backgroundColor: "#d1fae5",
            color: "#047857"
        };
    }

    if (status === "In Progress") {
        return {
            ...styles.badge,
            backgroundColor: "#dbeafe",
            color: "#1d4ed8"
        };
    }

    return {
        ...styles.badge,
        backgroundColor: "#fef3c7",
        color: "#92400e"
    };
}


/* =========================
   STYLES
========================= */

const styles = {

    page: {
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
            "Inter, Arial, Helvetica, sans-serif"
    },

    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 40px 60px"
    },

    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    backLink: {
        border: "none",
        background: "transparent",
        color: "#4f46e5",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        padding: "8px 0"
    },

    pageLabel: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        color: "#94a3b8"
    },

    mainCard: {
        backgroundColor: "#ffffff",
        borderRadius: "18px",
        border: "1px solid #e2e8f0",
        boxShadow:
            "0 8px 30px rgba(15,23,42,0.07)",
        padding: "35px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "25px"
    },

    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: "18px",
        minWidth: 0
    },

    taskIcon: {
        width: "58px",
        height: "58px",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
        background:
            "linear-gradient(135deg, #4f46e5, #7c3aed)",
        color: "#ffffff",
        fontSize: "27px",
        fontWeight: "700",
        boxShadow:
            "0 6px 15px rgba(79,70,229,0.25)"
    },

    overline: {
        margin: "0 0 5px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        color: "#94a3b8"
    },

    title: {
        margin: 0,
        fontSize: "30px",
        color: "#111827",
        wordBreak: "break-word"
    },

    badges: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },

    badge: {
        padding: "7px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "700",
        whiteSpace: "nowrap"
    },

    divider: {
        height: "1px",
        backgroundColor: "#e2e8f0",
        margin: "28px 0"
    },

    descriptionSection: {
        marginBottom: "28px"
    },

    sectionTitle: {
        margin: "0 0 10px",
        fontSize: "16px",
        color: "#111827"
    },

    description: {
        margin: 0,
        color: "#64748b",
        fontSize: "14px",
        lineHeight: "1.7"
    },

    infoGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
        gap: "15px",
        marginBottom: "25px"
    },

    infoCard: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0"
    },

    infoIcon: {
        width: "38px",
        height: "38px",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9px",
        fontSize: "17px"
    },

    infoLabel: {
        display: "block",
        fontSize: "9px",
        fontWeight: "700",
        letterSpacing: "0.8px",
        color: "#94a3b8",
        marginBottom: "4px"
    },

    infoValue: {
        display: "block",
        fontSize: "13px",
        color: "#334155"
    },

    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "20px",
        background:
            "linear-gradient(135deg, #eef2ff, #f5f3ff)",
        borderRadius: "13px",
        border: "1px solid #e0e7ff",
        marginBottom: "25px"
    },

    userAvatar: {
        width: "50px",
        height: "50px",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg, #4f46e5, #7c3aed)",
        color: "#ffffff",
        fontSize: "19px",
        fontWeight: "700"
    },

    userDetails: {
        minWidth: 0
    },

    userLabel: {
        fontSize: "9px",
        color: "#6366f1",
        fontWeight: "700",
        letterSpacing: "1px"
    },

    userName: {
        margin: "3px 0",
        fontSize: "16px",
        color: "#1e293b"
    },

    userEmail: {
        margin: 0,
        fontSize: "12px",
        color: "#64748b"
    },

    datesSection: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "18px 0",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0"
    },

    dateLabel: {
        display: "block",
        fontSize: "9px",
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: "1px",
        marginBottom: "5px"
    },

    dateValue: {
        display: "block",
        fontSize: "12px",
        color: "#475569"
    },

    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "25px"
    },

    backButtonLarge: {
        padding: "11px 18px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    },

    editButton: {
        padding: "11px 18px",
        backgroundColor: "#eef2ff",
        color: "#4f46e5",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    },

    deleteButton: {
        padding: "11px 18px",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    },

    loading: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        color: "#475569"
    },

    spinner: {
        width: "35px",
        height: "35px",
        border: "4px solid #e2e8f0",
        borderTop: "4px solid #6366f1",
        borderRadius: "50%",
        marginBottom: "15px"
    },

    errorPage: {
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        color: "#475569"
    },

    errorIcon: {
        width: "65px",
        height: "65px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: "#fef2f2",
        fontSize: "28px",
        marginBottom: "15px"
    },

    backButton: {
        marginTop: "15px",
        padding: "11px 20px",
        backgroundColor: "#4f46e5",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    }
};

export default TaskDetails;