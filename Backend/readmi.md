# Yogasana Task & Leaderboard - Backend

## Overview
This is the backend for the **Yogasana Task & Leaderboard** application, built with **Node.js, Express, MongoDB**, and **JWT authentication**. The backend handles user authentication, yoga task management, leaderboard updates, and reminders.

## Features
- User authentication (Register/Login)
- Add, complete, and delete yoga tasks
- Task-based points system with leaderboard
- Rating and commenting system for yogasanas
- Automated email reminders using **node-cron**
- RESTful API with JWT authentication middleware

## Tech Stack
- **Node.js & Express** - Backend framework
- **MongoDB & Mongoose** - Database & ORM
- **jsonwebtoken (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled reminders
- **nodemailer** - Email notifications
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## Installation
### 1. Clone the repository:
```sh
git clone https://github.com/your-repo/yogasana-backend.git
cd yogasana-backend
```

### 2. Install dependencies:
```sh
npm install
```

### 3. Configure Environment Variables:
Create a `.env` file in the root directory and add the following:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173
```

### 4. Start the server:
#### Development Mode:
```sh
npm run dev
```
#### Production Mode:
```sh
npm start
```

## API Endpoints
### User Routes
| Method | Endpoint     | Description         |
|--------|-------------|---------------------|
| POST   | /users/register | Register a new user |
| POST   | /users/login | User login & get token |

### Yoga Task Routes
| Method | Endpoint     | Description         |
|--------|-------------|---------------------|
| POST   | /yoga/task | Add a yoga task (Auth required) |
| POST   | /yoga/task/complete | Mark task as completed (Auth required) |
| DELETE | /yoga/:id | Delete a yoga task (Auth required) |
| GET    | /yoga/task | Get user's yoga tasks (Auth required) |
| GET    | /yoga/data | Get all yoga data |
| GET    | /yoga/leaderboard | Get leaderboard ranking |
| POST   | /yoga/rate | Rate a yoga asana (Auth required) |
| POST   | /yoga/comment | Comment on a yoga asana (Auth required) |

## Authentication
- The application uses **JWT-based authentication**.
- Protected routes require users to send a valid **JWT token** in the request headers:
```json
{
  "Authorization": "Bearer your_token_here"
}
```

## Cron Job - Daily Reminders
- A **cron job** is scheduled to send email reminders daily at **8:00 AM** to users who have pending tasks.

## Folder Structure
```
📦 yogasana-backend
 ┣ 📂 config
 ┃ ┗ 📜 db.js       # Database connection
 ┣ 📂 controllers
 ┃ ┣ 📜 user.controller.js  # User authentication logic
 ┃ ┗ 📜 yogaTask.controller.js # Yoga task operations
 ┣ 📂 middleware
 ┃ ┗ 📜 authMiddleware.js # JWT authentication middleware
 ┣ 📂 models
 ┃ ┣ 📜 user.model.js  # User schema
 ┃ ┗ 📜 yogaTask.model.js # Yoga task schema
 ┣ 📂 routes
 ┃ ┣ 📜 user.routes.js  # User-related routes
 ┃ ┗ 📜 yoga.routes.js  # Yoga-related routes
 ┣ 📂 utils
 ┃ ┗ 📜 sendReminder.js # Email reminder function
 ┣ 📜 .env.example # Environment variable template
 ┣ 📜 server.js # Main server entry file
 ┣ 📜 package.json # Dependencies and scripts
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the **MIT License**.

## Author
Abhishek Upadhyay - **Yogasana Community** 🚀

