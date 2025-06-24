# MERN Blog Application

A full-stack Blog Application built with the MERN stack (MongoDB, Express, React, Node.js) featuring:

- User authentication (Register/Login with JWT)
- Blog CRUD (Create, Read, Update, Delete)
- Commenting system
- Admin controls
- Role-based authorization

---

## Features

### ✅ User Authentication
- Register with email, username, and password
- Login with JWT authentication
- Password hashing using bcrypt

### ✅ Blog Management
- Create new blog posts (authenticated users)
- Edit & delete own blog posts
- View all blog posts (public)
- Admin can delete any blog post

### ✅ Commenting System
- View comments for each blog post
- Add comments (authenticated users)
- Delete own comments
- Admin can delete any comment

### ✅ Role-based Authorization
- Admin privileges for deleting any post or comment
- Authenticated users can only modify their own posts and comments

---

## Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcrypt

---

## Project Structure

