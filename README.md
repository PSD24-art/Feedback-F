# Academic Feedback Management System

A full-stack web application designed to digitize, simplify, and analyze academic feedback from students in an educational institution.  
The system provides secure, role-based access for faculty and administrators, structured feedback collection, and actionable insights to support data-driven academic improvements.

---

## Problem Statement

Traditional academic feedback systems are often:

- Paper-based, Google Forms–driven, or poorly organized
- Time-consuming to manage
- Difficult to analyze effectively
- Prone to bias, duplication, and data loss

This project addresses these challenges by offering a centralized, secure, and scalable web-based feedback platform.

---

## Solution Overview

The Academic Feedback Management System enables:

- Students to submit anonymous feedback securely
- Faculty to generate feedback links and view structured feedback analysis on a dashboard
- Administrators to manage faculties, subjects, and view consolidated reports
- Institutions to make informed academic decisions based on reliable feedback data

---

## User Roles & Responsibilities

### Faculty

- Add subjects to the system if not already available
- Generate feedback links by selecting subject and academic term
- Share feedback links with students
- View feedback analysis for their subjects
- Analyze strengths and areas of improvement
- No access to student identity

### Admin

- Manage faculties
- Create and manage subjects
- View overall analytics and reports
- Access faculty-wise and department-wise feedback insights

### Student

- Submit feedback anonymously
- Can submit feedback only once per faculty and subject

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- React.js
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- Passport.js
- Role-based access control

---

## Key Features

- Role-based authentication (Faculty / Admin)
- Secure login and session management
- Anonymous feedback submission
- AI-based feedback summary generation
- Duplicate submission prevention
- Smooth navigation and responsive UI
- Scalable and maintainable backend architecture

---

## Feedback Workflow

1. Faculty adds subjects to the database if not already present
2. Faculty generates a feedback link by selecting subject and term (e.g., W-26)
3. Faculty shares the feedback link with students
4. Students submit feedback through the form
5. Faculty and Admin analyze reports for decision-making

---

## System Design Highlights

- RESTful API architecture
- MVC-style backend separation
- Middleware-based authentication and authorization
- Scalable MongoDB schema design
- Clean, modular, and maintainable codebase

---

## Project Structure

/client
├── public
└── src
├── components
├── data
├── store
├── utils
├── pages
├── services
└── App.js

/server
├── controllers
├── routes
├── models
├── middleware
└── server.js

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/Feedback-F.git
```

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/Feedback-F.git
```

### Install dependencies:

```
npm install
```

### If the client is maintained separately, install frontend dependencies:

```
cd client
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the Application

Start both frontend and backend in development mode:

```
npm run dev
```

The application will be accessible on:

```
http://localhost:5000
```

## Future Enhancements

- Advanced data visualization dashboards
- AI-based sentiment analysis
- Export feedback reports (PDF / Excel)
- Mobile application support
- Automated email notifications

---

## Learning Outcomes

- Full-stack MERN application development
- Authentication and authorization using Passport.js
- Real-world system design and architecture
- Database schema modeling with MongoDB
- Writing clean, scalable, and maintainable code

## The applicatiion is live on

```
https://feedback-f.onrender.com
```
