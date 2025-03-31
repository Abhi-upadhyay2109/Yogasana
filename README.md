# Yogasana Community - Frontend


## Deployment Link
[Movie Search Web](https://yoga12.netlify.app/) 


## Project Overview
The **Yogasana Community** frontend is a React-based web application that allows users to:
- Register and log in securely.
- Access a personalized dashboard.
- Manage daily yoga tasks with a leaderboard system.
- Rate and comment on different yoga asanas.
- Perform tasks that reset daily upon completion.

## Tech Stack
- **React** (for UI development)
- **React Router** (for navigation)
- **Tailwind CSS** (for styling)
- **Axios** (for API calls)
- **Toastify** (for notifications)
- **React Icons** (for UI icons)
- **React Star Ratings** (for user ratings)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Steps to Set Up
```sh
# Clone the repository
git clone https://github.com/your-repo/yogasana-frontend.git

# Navigate into the project folder
cd yogasana-frontend

# Install dependencies
npm install  # or yarn install

# Start the development server
npm start  # or yarn start
```

## Folder Structure
```
Yogasana-Community/
│── public/
│── src/
│   ├── components/  # Reusable UI components (Navbar, PrivateRoute, etc.)
│   ├── pages/       # Main pages (Login, Register, Dashboard, YogaTask, Task)
│   ├── assets/      # Images and static files
│   ├── App.js       # Main app component with routes
│   ├── index.js     # Entry point for React app
│── package.json     # Dependencies and scripts
│── README.md        # Documentation
```

## Features & Functionality
### Authentication
- Users can **register, log in, and log out** securely.
- Authentication status is stored in **localStorage**.
- `PrivateRoute` ensures only authenticated users can access protected pages.

### Dashboard
- Displays user-specific information.
- Shows completed and pending tasks.

### Yoga Task Management
- Users can **add, complete, or delete tasks**.
- Tasks reset daily after completion.

### Ratings & Comments
- Users can **rate yoga asanas** using a **star rating system**.
- Comments allow users to share their experiences.

## API Integration
- Uses **Axios** to fetch and update yoga task data from the backend.
- Requests require an **access token** stored in localStorage.

## Environment Variables
Create a `.env` file and configure API endpoints:
```
REACT_APP_API_URL=http://localhost:8080
```

## Deployment
To build and deploy the project:
```sh
# Build for production
npm run build  # or yarn build
```
Host the **build/** folder on **Netlify, Vercel, or Firebase Hosting**.

## Contributing
Feel free to submit issues or contribute by creating pull requests.










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
