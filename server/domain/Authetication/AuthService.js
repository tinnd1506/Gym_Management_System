const db = require('../../infrastructure/Database');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

class UserService {
    async registerHandler(req, res) {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { email, username, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await db.querySingle('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUser) {
                return res.status(409).json({ 
                    error: 'An account with this email already exists',
                    code: 'EMAIL_EXISTS'
                });
            }

            // Hash the password and create a new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *';
            const user = await db.querySingle(sql, [email, username, hashedPassword]);
            
            // Remove password from response
            delete user.password;
            
            res.status(201).json({
                message: 'Registration successful',
                user
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ 
                error: 'Registration failed',
                message: 'An unexpected error occurred during registration'
            });
        }
    }

    async loginHandler(req, res) {
        try {
            const { email, password } = req.body;
            const sql = 'SELECT * FROM users WHERE email = $1';
            const user = await db.querySingle(sql, [email]);
            
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );
                
                res.json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username
                    }
                });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async logoutHandler(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token);
            
            // Add token to blacklist
            await db.blacklistToken(token, decoded.exp);

            res.status(200).json({ 
                status: 'success',
                message: 'Successfully logged out'
            });
        } catch (error) {
            res.status(500).json({ 
                status: 'error',
                message: error.message 
            });
        }
    }
}

module.exports = new UserService();
