const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes

const app = express();
const port = 5000;

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_auth'
});


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Use the auth routes
app.use('/api', authRoutes(db)); // Pass the database connection to the routes

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
