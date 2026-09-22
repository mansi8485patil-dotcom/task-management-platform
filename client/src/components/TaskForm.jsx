import { useState } from "react";
import api from "../services/api";

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pending");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await api.post("/tasks", {
                title,
                description,
                priority,
                dueDate,
                status,
                assignedUser: user.id
            });

            onTaskCreated(response.data.task);

            setTitle("");
            setDescription("");
            setPriority("Medium");
            setDueDate("");
            setStatus("Pending");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create task"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Create New Task</h2>

            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div style={styles.inputGroup}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={styles.button}
                >
                    {loading ? "Creating..." : "Create Task"}
                </button>

            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        marginBottom: "30px",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "10px"
    },

    inputGroup: {
        marginBottom: "15px"
    },

    error: {
        color: "red",
        backgroundColor: "#ffe5e5",
        padding: "10px",
        borderRadius: "5px"
    },

    button: {
        padding: "10px 20px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default TaskForm;