const express = require('express');
const bcrypt = require('bcryptjs');

// Router instance
const router = express.Router();

module.exports = (db) => {
    // Sign-Up Route (POST request to register a new user)
    router.post('/sign-up', async (req, res) => {
        const { name, email, phone, country, gender, age, password } = req.body;

        try {
            // Check if user already exists
            const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            await db.promise().query(
                'INSERT INTO users (name, email, phone, country, gender, age, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, email, phone, country, gender, age, hashedPassword]
            );

            res.status(201).json({ message: 'User registered successfully!' });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Login Route (POST request to authenticate user)
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            if (!user.length) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Compare the entered password with the hashed password
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Return user data (without the password)
            const { password: _, ...userData } = user[0];
            res.status(200).json({ message: 'Login successful', user: userData });
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    return router;
};
