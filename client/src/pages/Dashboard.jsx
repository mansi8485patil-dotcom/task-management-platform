import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import useTasks from "../hooks/useTasks";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

function Dashboard() {
  const { tasks, loading, deleteTask, addTask } = useTasks();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const navigate = useNavigate();

  // Search + filter
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const searchMatch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = status === "" || task.status === status;

      const priorityMatch = priority === "" || task.priority === priority;

      return searchMatch && statusMatch && priorityMatch;
    });

    if (sort === "newest") {
      result.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    if (sort === "oldest") {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return result;
  }, [tasks, search, status, priority, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, priority, sort]);

  // Statistics
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const startIndex = (currentPage - 1) * tasksPerPage;

  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );
  const total = tasks.length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  const progress = tasks.filter((task) => task.status === "In Progress").length;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <>
      <Navbar />

      <Toast message={toast.message} type={toast.type} />

      <style>{`
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f5f7fb;
                color: #222;
            }

            .dashboard-layout {
                display: flex;
                min-height: calc(100vh - 65px);
                background: #f5f7fb;
            }

            .dashboard-content {
                flex: 1;
                overflow-x: auto;
            }

            .dashboard {
                max-width: 1200px;
                margin: auto;
                padding: 30px;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
            }

            .header h1 {
                margin: 0;
                font-size: 30px;
            }

            .header p {
                color: #666;
            }

            .date {
                color: #666;
            }

            .stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 18px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 8px #ddd;
            }

            .stat-card h3 {
                margin: 0 0 10px;
                color: #666;
                font-size: 15px;
            }

            .stat-card h2 {
                margin: 0;
                font-size: 28px;
            }

            .form-box {
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 25px;
                box-shadow: 0 2px 8px #ddd;
            }

            .filters {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }

            .filters input,
            .filters select {
                padding: 11px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
            }

            .search {
                flex: 1;
                min-width: 200px;
            }

            .task-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            .task-card {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 8px #ddd;
            }

            .task-card h3 {
                margin-top: 0;
                margin-bottom: 10px;
            }

            .task-card p {
                color: #666;
                line-height: 1.5;
            }

            .badge {
                display: inline-block;
                padding: 5px 9px;
                border-radius: 15px;
                font-size: 12px;
                margin-right: 5px;
                background: #eee;
            }

            .task-info {
                font-size: 13px;
                color: #666;
                margin: 10px 0;
            }

            .buttons {
                display: flex;
                gap: 8px;
                margin-top: 15px;
            }

            button {
                border: none;
                padding: 9px 13px;
                border-radius: 6px;
                cursor: pointer;
            }

            .view {
                background: #eee;
            }

            .edit {
                background: #e8e4ff;
                color: #4f46e5;
            }

            .delete {
                background: #ffe5e5;
                color: #d00;
            }

            .empty {
                text-align: center;
                color: #777;
                padding: 40px;
            }

            @media (max-width: 900px) {
                .stats {
                    grid-template-columns: repeat(2, 1fr);
                }

                .task-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 700px) {
                .dashboard-layout {
                    flex-direction: column;
                }

                .dashboard {
                    padding: 20px;
                }

                .task-grid {
                    grid-template-columns: 1fr;
                }

                .header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
            }

            @media (max-width: 500px) {
                .dashboard {
                    padding: 15px;
                }

                .stats {
                    grid-template-columns: 1fr;
                }
            }

            .dark-mode {
    background: #111827;
    color: white;
}

.dark-mode .dashboard {
    background: #111827;
}

.dark-mode .stat-card,
.dark-mode .form-box,
.dark-mode .task-card {
    background: #1f2937;
    color: white;
}

.dark-mode .stat-card h3,
.dark-mode .task-card p,
.dark-mode .task-info,
.dark-mode .header p {
    color: #d1d5db;
}

.dark-mode .filters input,
.dark-mode .filters select {
    background: #1f2937;
    color: white;
    border-color: #4b5563;
}

.dark-btn {
    background: #111827;
    color: white;
    padding: 10px 15px;
    border-radius: 7px;
}

.dark-mode .dark-btn {
    background: white;
    color: #111827;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.pagination button {
    background: #111827;
    color: white;
    padding: 10px 15px;
}

.pagination button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.pagination span {
    font-weight: bold;
}

.loading-box {
    text-align: center;
    padding: 50px;
}

.spinner {
    width: 35px;
    height: 35px;
    border: 4px solid #ddd;
    border-top: 4px solid #111827;
    border-radius: 50%;
    margin: 0 auto 15px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
    

        `}</style>

      <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>
        {" "}
        <Sidebar />
        <main className="dashboard-content">
          <div className="dashboard">
            {/* Header */}
            <div className="header">
              <div>
                <h1>Dashboard</h1>
                <br />
                <p>Manage your tasks easily</p>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="dark-btn"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              <div className="date">{new Date().toLocaleDateString()}</div>
            </div>
            {/* Statistics */}
            <div className="stats">
              <div className="stat-card">
                <h3>Total Tasks</h3>
                <h2>{total}</h2>
              </div>

              <div className="stat-card">
                <h3>Pending</h3>
                <h2>{pending}</h2>
              </div>

              <div className="stat-card">
                <h3>In Progress</h3>
                <h2>{progress}</h2>
              </div>

              <div className="stat-card">
                <h3>Completed</h3>
                <h2>{completed}</h2>
              </div>
            </div>
            {/* Create Task */}
            <div className="form-box">
              <TaskForm onTaskCreated={addTask} />
            </div>
            {/* Search and Filter */}
            <div className="filters">
              <input
                className="search"
                type="text"
                placeholder="Search task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Due Date: Newest</option>

                <option value="oldest">Due Date: Oldest</option>
              </select>
            </div>
            {/* Tasks */}
            {loading ? (
              <div className="loading-box">
                <div className="spinner"></div>
                <p>Loading tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty">No tasks found.</div>
            ) : (
              <div className="task-grid">
                {paginatedTasks.map((task) => (
                  <div className="task-card" key={task._id}>
                    <h3>{task.title}</h3>

                    <span className="badge">{task.priority}</span>

                    <span className="badge">{task.status}</span>

                    <p>{task.description}</p>

                    <div className="task-info">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>

                    <div className="task-info">
                      Assigned to: {task.assignedUser?.name || "You"}
                    </div>

                    <div className="buttons">
                      <button
                        className="view"
                        onClick={() => navigate(`/tasks/${task._id}`)}
                      >
                        View
                      </button>

                      <button
                        className="edit"
                        onClick={() => navigate(`/tasks/${task._id}/edit`)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={async () => {
                          await deleteTask(task._id);
                          showToast("Task deleted successfully");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            ;
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ← Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
