# Student Examination System

Online examination system built with React, Node.js, Express and MySQL.

## Features

### Student
- Register/Login
- View and attend exams
- View results
- Contact and feedback

### Admin
- Admin Login
- Dashboard
- Manage exams and questions
- Manage students
- View results, contacts and feedback

## Technologies

- React + Vite
- Node.js + Express
- MySQL
- JWT
- Axios

## Steps to Run

### 1. Database

Start **XAMPP → MySQL**.

Open phpMyAdmin and create:

```text
db_exam
```

Import:

```text
database/db_exam.sql
```

### 2. Backend

Open terminal:

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### 4. Login

Open:

```text
http://localhost:5173
```

## Demo Login

### Admin

```text
Email: admin@example.com
Password: admin123
```

### Student

```text
Email: student@example.com
Password: student123
```

## Important

- Start MySQL before the backend.
- Run frontend and backend in separate terminals.
- Database name: `db_exam`.
