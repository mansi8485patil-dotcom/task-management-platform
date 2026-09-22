# Task & Team Management Platform

A full-stack Task & Team Management Platform developed using React, Node.js, Express and MongoDB.

The application allows users to register, login securely, create and manage tasks, search and filter tasks, and track task status from a dashboard.

## 🚀 Live Demo

### Frontend
https://task-management-platform-beta.vercel.app/

### Backend
https://task-management-platform-0v9l.onrender.com

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Remember Me
- Password Hashing using bcrypt
- Email and password validation
- Duplicate user validation

### Dashboard
- Total Tasks count
- Pending Tasks count
- In Progress Tasks count
- Completed Tasks count
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort Tasks by Due Date
- Pagination
- Dark Mode
- Toast Notifications

### Task Management
- Create Task
- View Task Details
- Edit Task
- Delete Task
- Assign Task to User
- Set Task Priority
- Set Task Status
- Set Due Date

### React Concepts Used
- useState
- useEffect
- useMemo
- useCallback
- React.memo
- Custom Hooks
- Context API
- Lazy Loading
- Suspense
- Protected Routes

### Bonus Features Implemented
- Dark Mode
- Pagination
- Toast Notifications
- Unit Tests

## 📁 Project Structure

```text
task-management-platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── __tests__/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md