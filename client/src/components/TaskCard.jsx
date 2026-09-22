import React from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="task-card">

            <div className="task-header">
                <h3>{task.title}</h3>

                <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>

            <p className="description">
                {task.description}
            </p>

            <div className="task-info">
                <span>
                    Status: <b>{task.status}</b>
                </span>

                <span>
                    Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                </span>
            </div>

            <div className="task-buttons">

                <button
                    onClick={() => navigate(`/tasks/${task._id}`)}
                >
                    View
                </button>

                <button
                    onClick={() => navigate(`/tasks/${task._id}/edit`)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default React.memo(TaskCard);