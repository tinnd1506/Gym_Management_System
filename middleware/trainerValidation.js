const { body, validationResult } = require("express-validator");

// Middleware to validate trainer data
const validateTrainer = [
	body("name").notEmpty().withMessage("Trainer name is required."),
	body("expertise").notEmpty().withMessage("Expertise is required."),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateTrainer;
