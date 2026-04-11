# MERN Stack Todo List App

A fully functional Todo List application built using Node.js,
Express.js, MongoDB, and React. This project demonstrates 
CRUD operations, real-time searching, and responsive UI design.

# Features 🚀

Create: Add new tasks to the database.
Read: Fetch and display tasks from MongoDB.
Update: Edit task text and toggle completion status.
Delete: Remove tasks permanently from the list.
Search: Real-time client-side filtering of tasks.
Error Handling: Graceful error messages if the server is offline.

# Tech Stack 🛠️ 

Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Hosting: Render (Backend), Netlify (Frontend)

# Setup Instructions ⚙️ 

# 1. Backend Setup

-Clone the repository.
-Navigate to the backend folder: cd backend.
-Install dependencies: npm install.
-Create a .env file and add your MongoDB URI:

-Code snippet
 MONGO_URI=your_mongodb_connection_string
 PORT=5000
-Start the server: npm start.

# 2. Frontend Setup

-Navigate to the frontend folder: cd frontend.
-Install dependencies: npm install.
-Start the React app: npm run dev.

# 🛑 Challenges Faced & Solutions

1. Synchronizing UI with Database
Challenge: Initially, the UI didn't update immediately after deleting or editing a task unless I refreshed the page.
Solution: I used React state management. After a successful API call, I updated the local todos state using the .map() and .filter() methods. This made the app feel "seamless" and fast.

2. Handling Server Downtime
Challenge: If the backend (hosted on Render) was sleeping or disconnected, the app would just stay blank, confusing the user.
Solution: I implemented a global error state and wrapped my API calls in try/catch blocks. Now, if the connection fails, a user-friendly red error message appears.

3. Real-time Search Logic
Challenge: I wasn't sure whether to search in the database or on the frontend.
Solution: I decided to use client-side filtering. By applying .filter() to the state array before mapping it to the UI, the search works instantly as the user types without making extra API calls.

# 📁 Project Structure

```text
root/
├── backend/
│   ├── controllers/    # Logic for handling requests/responses
│   ├── models/         # Mongoose schema for Todo items
│   ├── routes/         # API endpoint definitions
│   └── server.js       # Entry point for the backend
├── frontend/
│   ├── src/            # React components and Tailwind styling
│   └── public/         # Static assets
├── .gitignore          # Files to be ignored by Git (node_modules, .env)
└── README.md           # Documentation
```

# 🔎 API Testing

I used Thunder Client instead of Postman because it is integrated directly into VS Code, making debugging faster.

- GET /api/todos: Verified data fetching from MongoDB.
- POST /api/todos: Tested task creation with JSON bodies.
- PATCH /api/todos/:id: Verified status toggling and text edits.
- DELETE /api/todos/:id: Confirmed task removal.

# Result: 
 All endpoints returned correct status codes (200 OK, 201 Created) 
 and synced perfectly with the database.


# Learning & Development💡
I built this project through self-directed learning and research. I used documentation, YouTube tutorials, and AI tools for debugging to understand complex logic and industry best practices. This helped me get a better grip on the MERN stack and improved my ability to solve coding problems on my own.


# Links🔗:

✅Live Demo: [https://todolist-app-2026.netlify.app/]

✅Backend API: [https://todo-backend-bnzm.onrender.com/api/todos]