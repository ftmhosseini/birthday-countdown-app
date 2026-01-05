🎉 Full-Stack Login & Birthday App

This project is a full-stack web application built with a Node.js backend, MySQL database, and a vanilla JavaScript frontend UI.
It supports user authentication, image carousel display, and a personalized birthday countdown page.

🚀 Features

🔐 User Authentication

Sign up with name, email, password, and date of birth

Login with email and password

🎠 Image Carousel

Loads images dynamically from MySQL

Special birthday carousel on user’s birthday

🎂 Birthday Page

Shows how many days are left until the user’s birthday

Displays a birthday carousel if today is the user’s birthday

🔄 Single Page Application (SPA)

No page reloads

Navigation handled with JavaScript

🔓 Secure Configuration

Uses dotenv to protect database credentials

🔑 Sign Out Support

Navbar switches between Login/Signup and Sign Out

🧱 Tech Stack
Frontend

HTML

CSS (Bootstrap)

JavaScript (ES Modules)

Fetch API

Backend

Node.js

Express

MySQL

mysql2

dotenv

cors

📁 Project Structure
project-root/
│
├── public/
│   ├── index.html
│   ├── app.js
│   └── js/
│       ├── login.js
│       ├── sign_up.js
│       ├── birthday.js
│       └── carousel.js
│
├── server/
│   ├── server.js
│   ├── routes/
│   │   ├── login-route.js
│   │   └── carousel-route.js
│   ├── controllers/
│   │   ├── login_controller.js
│   │   └── carousel-controller.js
│   ├── models/
│   │   ├── login_model.js
│   │   └── carousel_model.js
│   └── mysql_db.js
│
├── .env
├── package.json
└── README.md
