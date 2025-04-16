💰 smartspend-backend

This is the backend for a personal finance management app. Built with **Node.js**, **Express**, and **MongoDB**, it supports features like:

- ✅ User authentication (Register + Login)
- 🔐 JWT-based session management
- 📊 Routes for managing income, expenses, wishlist items
- ⚙️ User settings (Dark mode, currency, notifications)

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
backend/
│
├── controllers/        # Logic for each route (auth, user, settings)
├── models/             # Mongoose models
├── routes/             # Route definitions
├── middleware/         # Auth middleware (e.g. protectRoute)
├── config/             # DB connection logic
├── validators/         # Validators
├── utils/              # Utilities
├── index.js            # Entry point of the backend
├── .env                # Secret keys and environment variables
└── README.md

---

## 📬 API Endpoints

### Auth Routes

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login with email or username

### (Coming Soon)

- `GET /api/user/profile` – Get user profile
- `PUT /api/user/settings` – Update user settings
- `POST /api/expenses/` – Add an expense
- `POST /api/income/` – Add an income
- `GET /api/wishlist/` – View needs and wants

---
