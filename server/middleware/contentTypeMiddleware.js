const validateContentType = (req, res, next) => {
    if (req.method !== 'GET') {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(415).json({
                status: 'error',
                code: 'INVALID_CONTENT_TYPE',
                message: 'Content-Type must be application/json',
                details: 'Please set the Content-Type header to application/json'
            });
        }
    }
    next();
};

module.exports = validateContentType; 