import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to load tasks"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTask = useCallback(async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        try {
            await api.delete(`/tasks/${id}`);

            setTasks((oldTasks) =>
                oldTasks.filter((task) => task._id !== id)
            );
        } catch (error) {
            alert("Failed to delete task");
        }
    }, []);

    const addTask = useCallback((newTask) => {
        setTasks((oldTasks) => [newTask, ...oldTasks]);
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        loading,
        deleteTask,
        addTask,
        fetchTasks
    };
}

export default useTasks;