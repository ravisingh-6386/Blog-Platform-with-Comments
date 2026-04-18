# Blog Platform With Comments

A full-stack blogging platform where users can register, log in, create posts, edit or delete their own posts, and interact through comments.

## Features

- User authentication with JWT
- User registration and login
- Create, read, update, and delete blog posts
- Comment on posts
- Delete own comments
- Protected routes for authenticated actions

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs

## Project Structure

- `backend` - API server and database models
- `frontend` - React user interface

## Setup

### 1. Clone and install

```bash
git clone https://github.com/ravisingh-6386/Blog-Platform-with-Comments.git
cd Blog-Platform-with-Comments
npm run install:all
```

### 2. Configure backend environment

Create `backend/.env` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=your_secure_secret
CLIENT_URL=http://localhost:5173,http://localhost:5174
```

### 3. Run the app

```bash
npm run dev
```

- Frontend: http://localhost:5173 (or 5174 if 5173 is busy)
- Backend API: http://localhost:5000

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Posts
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` (protected)
- `PUT /api/posts/:id` (protected, owner only)
- `DELETE /api/posts/:id` (protected, owner only)

### Comments
- `GET /api/posts/:postId/comments`
- `POST /api/posts/:postId/comments` (protected)
- `DELETE /api/comments/:commentId` (protected, owner only)

## Learning Outcome

This project demonstrates practical full-stack development with authentication, content management, and user interaction features.
