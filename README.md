# 📝 Health Blog App

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) blog application with user authentication, post management, category filtering, and a modern responsive UI using **Tailwind CSS** and **ShadCN UI components**.

---

## 📁 Project Structure

mern-blog/
├── client/ # React frontend (Vite + Tailwind + ShadCN)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── context/
│ │ └── App.jsx
│ └── package.json
├── server/ # Express backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ ├── server.js
│ └── package.json
└── README.md

---

## 🚀 Features

- ✅ User Registration & Login (JWT)
- ✅ Create, Read, Update, Delete (CRUD) Blog Posts
- ✅ Categories for filtering posts
- ✅ Comments on blog posts
- ✅ Image Uploads (Multer)
- ✅ Pagination, Filtering, Search
- ✅ Protected Routes & Auth Context
- ✅ Responsive UI with Tailwind CSS + ShadCN components

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/health-blog.git
cd health-blog
2. Setup the Backend

cd server
npm install
Create a .env file in /server:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=yourSuperSecret
Run the server:

npm start
3. Setup the Frontend

cd ../client
npm install
Create a .env file in /client:

VITE_API_URL=http://localhost:5000/api
Run the client:

npm run dev
🧪 API Endpoints
Auth
POST /api/auth/register – Register a user

POST /api/auth/login – Login and get JWT

Posts
GET /api/posts – Get all posts

GET /api/posts/:id – Get a specific post

POST /api/posts – Create post (auth required)

PUT /api/posts/:id – Update post

DELETE /api/posts/:id – Delete post

POST /api/posts/:id/comments – Add comment

Categories
GET /api/categories – Get all categories

POST /api/categories – Create new category

🧱 Built With
Frontend

Vite

React.js

Tailwind CSS

ShadCN UI

Axios

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

Multer

👤 User Roles
Default role is "user".

You can implement "admin"-only features in the future (e.g., delete others' posts).

📷 Screenshots
Refer to the main for sample screenshots

✅ TODO / Improvements
 Rich text editor for blog content

 Admin dashboard

 Like & bookmark system

 Email verification / password reset

📄 License
MIT License © 2025 Stephen
