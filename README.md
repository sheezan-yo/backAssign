# Task Manager with RBAC

A full-stack Task Management application built with the MERN stack featuring JWT Authentication, Role-Based Access Control (RBAC), Task CRUD operations, Joi validation, and Swagger API documentation.

## Deployed Site
```
https://back-assignment.vercel.app
```

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes

### Role-Based Access Control

* User Role

  * Create Tasks
  * View Own Tasks
  * Update Own Tasks
  * Delete Own Tasks

* Admin Role

  * View All Users
  * View All Tasks
  * Delete Any Task

### Task Management

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Task Status Management

### Security

* JWT Authentication
* Password Hashing
* Joi Validation
* Protected API Routes
* Role-Based Authorization

### API Documentation

* Swagger UI Documentation

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Joi
* Swagger

---

## Project Structure

```text
backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── validations/
├── config/
└── server.js

frontend/
│
├── pages/
├── services/
├── App.jsx
└── main.jsx
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```http
POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

### Admin

```http
GET    /api/v1/admin/users
GET    /api/v1/tasks/admin/all
DELETE /api/v1/tasks/admin/:id
```

---

## API Documentation

Swagger Documentation:

```text
/api-docs
```

---

## Scalability Considerations

This project follows several practices that support future scalability:

* Stateless JWT Authentication
* Modular MVC Architecture
* API Versioning using `/api/v1`
* Role-Based Access Control
* Reusable Middleware Structure
* Validation Layer using Joi
* Separation of Controllers, Routes, and Business Logic

Future improvements may include:

* Redis Caching
* Rate Limiting
* Logging and Monitoring
* Docker Containerization
* Load Balancing
* Microservice Architecture

---

## Future Enhancements

* User Profile Management
* Task Search & Filtering
* Task Categories
* Task Deadlines
* Email Notifications
* Admin Analytics Dashboard

---

## Author

Mohd Sheezan Khan

GitHub: https://github.com/sheezan-yo
