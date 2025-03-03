# Yogasana Community - Frontend

Deployment-link - https://yoga12.netlify.app/


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

