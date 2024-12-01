const jwt = require('jsonwebtoken');
const db = require('../infrastructure/Database');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                status: 'error',
                code: 'AUTH_HEADER_MISSING',
                message: 'Authorization header is required'
            });
        }

        // Check if Authorization header has correct format
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                code: 'INVALID_TOKEN_FORMAT',
                message: 'Authorization header must start with "Bearer"',
                details: 'Format should be: Bearer <token>'
            });
        }

        const token = authHeader.split(' ')[1];

        // Check if token exists after Bearer
        if (!token) {
            return res.status(401).json({
                status: 'error',
                code: 'TOKEN_MISSING',
                message: 'Access token is missing'
            });
        }

        // Check if token is blacklisted
        const isBlacklisted = await db.isTokenBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({
                status: 'error',
                code: 'TOKEN_INVALIDATED',
                message: 'Token has been invalidated by logout'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        // Handle different types of JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                code: 'TOKEN_EXPIRED',
                message: 'Access token has expired',
                details: 'Please login again to get a new token'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'error',
                code: 'INVALID_TOKEN',
                message: 'Invalid access token',
                details: error.message
            });
        }

        // Generic error handler
        return res.status(401).json({
            status: 'error',
            code: 'AUTH_ERROR',
            message: 'Authentication failed',
            details: error.message
        });
    }
};

module.exports = authenticateToken;
