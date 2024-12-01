const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_JSON',
            message: 'Invalid JSON format in request body',
            details: err.message
        });
    }
    
    // Handle other types of errors
    return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        details: err.message
    });
};

module.exports = errorHandler; 