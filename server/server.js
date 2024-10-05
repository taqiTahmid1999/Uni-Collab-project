const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uni-collab'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Root route URL
app.get('/', (req, res) => {
    res.send('Hello World');
});

// User Registration
app.post("/api/sign-up", async (req, res) => {
    const { name, email, phone, country, gender, age, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, phone, country, gender, age, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, email, phone, country, gender, age, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to register user" });
        }
        res.status(201).json({ message: "User registered successfully", user: result.insertId });
    });
});

// User Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // No JWT - Simply send back the user details
        res.json({ message: "Login successful", user });
    });
});

// User Profile
app.get("/api/profile/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = `SELECT id, name, email, phone, country, gender, age FROM users WHERE id = ?`;
    db.query(query, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send the user's profile data
        res.json({ user: results[0] });
    });
});

// Create Project
app.post("/api/project-setup", (req, res) => {
    const { projectName, projectDescription, projectType, projectPassword, adminName, adminEmail } = req.body;

    const query = `INSERT INTO projects (name, description, type, password, admin_name, admin_email) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [projectName, projectDescription, projectType, projectPassword, adminName, adminEmail], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to create project" });
        }
        res.status(201).json({ message: "Project created successfully", projectId: result.insertId });
    });
});

// Join Existing Project (Login to Project)
app.post("/api/project-login", (req, res) => {
    const { projectName, projectPassword } = req.body;

    const query = `SELECT * FROM projects WHERE name = ?`;
    db.query(query, [projectName], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }

        const project = results[0];

        if (project.password !== projectPassword) {
            return res.status(401).json({ error: "Incorrect project password" });
        }

        res.json({ message: "Project login successful", project });
    });
});

// Fetch User Projects
app.get("/api/user-projects/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT p.*
        FROM projects p
                 JOIN user_projects up ON p.id = up.project_id
        WHERE up.user_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch user projects" });
        }
        res.json({ projects: results });
    });
});

// Add User to Project (many-to-many relationship)
app.post("/api/add-user-to-project", (req, res) => {
    const { userId, projectId } = req.body;

    const query = `INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)`;
    db.query(query, [userId, projectId], (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add user to project" });
        }
        res.json({ message: "User added to project successfully" });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
