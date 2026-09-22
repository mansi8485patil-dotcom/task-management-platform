import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));
const EditTask = lazy(() => import("./pages/EditTask"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    <Route path="/" element={<Login />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/tasks/:id"
                        element={
                            <ProtectedRoute>
                                <TaskDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/tasks/:id/edit"
                        element={
                            <ProtectedRoute>
                                <EditTask />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;