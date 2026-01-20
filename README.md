<strong>🎉 Full-Stack Authentication & Birthday Event System</strong>

A robust full-stack application built with Node.js and Vanilla JavaScript that features a unique Database Selector system. The app adapts its UI and logic based on the user's birthday, switching between standard motivation and celebratory event modes.

<br>
<strong>🚀 Key Features</strong>

- <b>Dual-Database Support (MySQL & Firebase):</b> Features a flexible architecture that allows switching between a relational MySQL backend and a real-time Firebase NoSQL backend.

- <b>Zero-CORS API Integration:</b> Motivational quotes are fetched via the Node.js backend, acting as a secure proxy to bypass browser CORS restrictions.

- <b>SIntelligent UI State Management:</b> 

    - Home State: Displays a standard image carousel and motivational quotes.

    - Birthday State: Triggers a specific "Birthday Event" mode with celebratory carousels and countdowns.

- <b>SPA Architecture:</b> A Single Page Application experience using ES Modules to manage views without page refreshes.

- <b>Dynamic Navbar:</b> Context-aware navigation that toggles between Auth (Login/Signup) and User (Sign Out) states.

<br>
<strong>🛠 Tech Stack</strong>

- <b>Frontend:</b> JavaScript (ES6+ Modules), HTML5, CSS3.

- <b>Backend:</b> Node.js, Express.js

- <b>Databases:</b> MySQL (mysql2), Firebase Realtime DB

- <b>Security:</b> Dotenv, Service Account Keys, CORS Middleware.

<br>
<strong>📂 Directory Structure (MVC Pattern)</strong>

The backend is organized using the Model-View-Controller design pattern to keep data logic separate from API routing.
```bash
project-root/
├── public/             # Frontend SPA (HTML, App logic, Modules)
├── server/
│   ├── models/         # Database Queries (MySQL & Firebase logic)
│   ├── controllers/    # Business logic & Birthday calculations
│   ├── utilities/      # Database connection initializers
│   └── routes/         # API Endpoints
├── .env2               # Template for environment variables
└── serviceAccountKey2.json # Template for Firebase credentials
```

<br>
<strong>📐 Technical Deep-Dive</strong>

<br>
<strong>🔄 The Database Selector logic</strong>

The application is designed to be database-agnostic. Depending on the configuration, the system can point to:

1- <b>MySQL:</b> Best for structured data and complex relations using connection pooling.

2- <b>Firebase:</b> Utilized for real-time updates and seamless Authentication integration.

<br>
<strong>⚡ Database Optimization (Indexing)</strong>

To ensure high-performance lookups when checking for duplicate emails during registration, I implemented custom rules in the Firebase Realtime Database. By adding <i>".indexOn": ["email"]</i>, the database pre-indexes the user list.

-<b>Efficiency:</b> This optimization shifts lookup speeds from a linear <b>O(n)</b> scan to efficient <b>O(1)</b> or <b>O(logn)</b> speeds, ensuring the app remains fast as the user base grows.

<br>
<strong>🌐 Backend Quote Fetching</strong>

Unlike client-side fetching, this app uses a server-side route:

1- Frontend calls <i>/api/quote.</i>

2- Backend fetches from the external API.

3- Backend returns JSON to Frontend. Result: No CORS errors and no need for multiple URL fallbacks.

<br>
<strong>🔐 Security & Configuration</strong>

To protect sensitive credentials, the project uses a strict Environment Variable strategy.

<b>Note:</b> For security, the actual <i>.env</i> and <i>serviceAccountKey.json</i> files are ignored by git. I have provided <i>.env2</i> and <i>serviceAccountKey2.json</i> as templates. To run the app, you must rename these to their original names and populate them with valid credentials.

<br>
<strong>⚙️ Setup & Configuration</strong>

1- <b>Environment & Firebase:</b> 

- Rename <i>.env2</i> to <i>.env</i> and fill in your DB credentials.

- Rename <i>.serviceAccountKey2</i>.json to <i>serviceAccountKey.json</i> and paste your Firebase Admin SDK key.

2- <b>Database Setup (MySQL):</b> 

Run the following SQL commands to initialize your relational database:

```bash
CREATE DATABASE IF NOT EXISTS login_db;
USE login_db;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3- <b>Database Setup (MySQL):</b> 

Ensure your Firebase Realtime Database follows this structure:
```bash
{
  "images": {
    "img1": { "url": "...", "type": "home", "description": "Welcome!" },
    "img2": { "url": "...", "type": "birthday", "description": "Happy Birthday! 🎉" }
  },
  "userss": {
    "unique_id": { "name": "...", "email": "...", "dob": "YYYY-MM-DD" }
  }
}
```
4- <b>Launch</b>

```bash
    npm install
    npm start
```