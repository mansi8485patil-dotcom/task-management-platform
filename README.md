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
- Invalid JWT handling

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
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── create-task.png
│   ├── task-details.png
│   ├── edit-task.png
│   ├── dark-mode.png
│   ├── pagination.png
│   └── toast.png
│
├── Task-Management-API.postman_collection.json
├── .gitignore
└── README.md

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/mansi8485patil-dotcom/task-management-platform.git
cd task-management-platform

2. Frontend Setup
cd client
npm install
npm run dev

Frontend runs using Vite.

3. Backend Setup

Open another terminal:

cd server
npm install
npm run dev

Backend runs on:

http://localhost:5000

Production Backend

The deployed backend is available at:

https://task-management-platform-0v9l.onrender.com

🔐 Environment Variables
Server

Create a file:

server/.env

Add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Client

Create:

client/.env

Add:

VITE_API_URL=http://localhost:5000/api

For production, use the deployed Render backend URL as the value of VITE_API_URL.

Do not commit .env files or sensitive credentials to GitHub.

🔗 API Documentation
Authentication
Register
POST /api/auth/register

Request body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@1234"
}
Login
POST /api/auth/login

Request body:

{
  "email": "test@example.com",
  "password": "Test@1234"
}
Task APIs

All task APIs require JWT authentication.

Authorization header:

Authorization: Bearer YOUR_TOKEN
Get All Tasks
GET /api/tasks
Get Task by ID
GET /api/tasks/:id
Create Task
POST /api/tasks

Request body:

{
  "title": "Learn React",
  "description": "Practice React concepts and hooks",
  "priority": "High",
  "dueDate": "2026-09-30",
  "status": "Pending",
  "assignedUser": "USER_ID"
}
Update Task
PUT /api/tasks/:id
Delete Task
DELETE /api/tasks/:id
🧪 Unit Testing

Vitest is used for unit testing.

Run:

cd client
npm test -- --run
📸 Screenshots
Login Page

Register Page

Dashboard

Create Task

Task Details

Edit Task

Dark Mode

Pagination

Toast Notification

🌐 Deployment
Frontend

Deployed on Vercel:

https://task-management-platform-beta.vercel.app/

Backend

Deployed on Render:

https://task-management-platform-0v9l.onrender.com

Database

MongoDB Atlas is used for cloud database storage.

🔒 Security
Passwords are hashed using bcrypt.
JWT is used for authentication.
Protected APIs require a valid JWT token.
Environment variables are used for sensitive configuration.
MongoDB credentials are not committed to GitHub.
JWT secrets are not committed to GitHub.
👤 Test Credentials

Replace the following placeholders with your actual working deployed test credentials before final submission.

Email: YOUR_TEST_EMAIL
Password: YOUR_TEST_PASSWORD
Role: User

If an Admin account is available:

Email: YOUR_ADMIN_EMAIL
Password: YOUR_ADMIN_PASSWORD
Role: Admin
📦 Postman API Collection

The Postman API collection is included in the repository:

Task-Management-API.postman_collection.json

It contains the authentication and task management API requests.
