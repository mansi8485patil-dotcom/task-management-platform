import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        status: "Pending"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}`);

                const task = response.data;

                setFormData({
                    title: task.title || "",
                    description: task.description || "",
                    priority: task.priority || "Medium",
                    dueDate: task.dueDate
                        ? task.dueDate.substring(0, 10)
                        : "",
                    status: task.status || "Pending"
                });

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (
            !formData.title ||
            !formData.description ||
            !formData.dueDate
        ) {
            setError("Please fill all required fields.");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/tasks/${id}`, formData);

            alert("Task updated successfully! ✅");

            navigate(`/tasks/${id}`);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update task"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <h2>Loading task...</h2>
            </div>
        );
    }

    return (
        <div style={styles.page}>

            <Navbar />

            <main style={styles.container}>

                {/* TOP */}

                <div style={styles.topBar}>

                    <button
                        style={styles.backButton}
                        onClick={() =>
                            navigate(`/tasks/${id}`)
                        }
                    >
                        ← Back to Task
                    </button>

                    <span style={styles.label}>
                        EDIT TASK
                    </span>

                </div>


                {/* FORM CARD */}

                <div style={styles.card}>

                    <div style={styles.header}>

                        <div style={styles.icon}>
                            ✏
                        </div>

                        <div>
                            <h1 style={styles.title}>
                                Edit Task
                            </h1>

                            <p style={styles.subtitle}>
                                Update the task details below.
                            </p>
                        </div>

                    </div>


                    <div style={styles.divider}></div>


                    {/* ERROR */}

                    {error && (
                        <div style={styles.error}>
                            ⚠ {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        {/* TITLE */}

                        <div style={styles.inputGroup}>

                            <label style={styles.labelText}>
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                style={styles.input}
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div style={styles.inputGroup}>

                            <label style={styles.labelText}>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                style={styles.textarea}
                                rows="5"
                                required
                            />

                        </div>


                        {/* TWO COLUMNS */}

                        <div style={styles.grid}>

                            {/* PRIORITY */}

                            <div style={styles.inputGroup}>

                                <label style={styles.labelText}>
                                    Priority
                                </label>

                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    style={styles.input}
                                >
                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                </select>

                            </div>


                            {/* STATUS */}

                            <div style={styles.inputGroup}>

                                <label style={styles.labelText}>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={styles.input}
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* DUE DATE */}

                        <div style={styles.inputGroup}>

                            <label style={styles.labelText}>
                                Due Date
                            </label>

                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />

                        </div>


                        {/* BUTTONS */}

                        <div style={styles.actions}>

                            <button
                                type="button"
                                style={styles.cancelButton}
                                onClick={() =>
                                    navigate(`/tasks/${id}`)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    ...styles.saveButton,
                                    opacity: saving ? 0.7 : 1
                                }}
                            >
                                {saving
                                    ? "Saving..."
                                    : "✓ Save Changes"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}


const styles = {

    page: {
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
            "Inter, Arial, Helvetica, sans-serif"
    },

    container: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px 40px 60px"
    },

    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    backButton: {
        border: "none",
        background: "transparent",
        color: "#4f46e5",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "14px"
    },

    label: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        color: "#94a3b8"
    },

    card: {
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "35px",
        boxShadow:
            "0 8px 30px rgba(15,23,42,0.07)"
    },

    header: {
        display: "flex",
        alignItems: "center",
        gap: "15px"
    },

    icon: {
        width: "55px",
        height: "55px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "14px",
        background:
            "linear-gradient(135deg, #4f46e5, #7c3aed)",
        color: "white",
        fontSize: "24px"
    },

    title: {
        margin: 0,
        fontSize: "28px",
        color: "#111827"
    },

    subtitle: {
        margin: "5px 0 0",
        color: "#64748b",
        fontSize: "14px"
    },

    divider: {
        height: "1px",
        backgroundColor: "#e2e8f0",
        margin: "28px 0"
    },

    error: {
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#b91c1c",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
        fontSize: "13px"
    },

    inputGroup: {
        marginBottom: "20px"
    },

    labelText: {
        display: "block",
        marginBottom: "7px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#374151"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 13px",
        border: "1px solid #cbd5e1",
        borderRadius: "9px",
        outline: "none",
        fontSize: "14px",
        color: "#334155",
        backgroundColor: "#ffffff"
    },

    textarea: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 13px",
        border: "1px solid #cbd5e1",
        borderRadius: "9px",
        outline: "none",
        fontSize: "14px",
        color: "#334155",
        resize: "vertical",
        fontFamily: "inherit"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
    },

    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "10px",
        paddingTop: "25px",
        borderTop: "1px solid #e2e8f0"
    },

    cancelButton: {
        padding: "12px 20px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer"
    },

    saveButton: {
        padding: "12px 22px",
        background:
            "linear-gradient(135deg, #4f46e5, #7c3aed)",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow:
            "0 5px 12px rgba(79,70,229,0.25)"
    },

    loading: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        color: "#475569"
    }
};

export default EditTask;