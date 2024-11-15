const { body, validationResult } = require("express-validator");

// Middleware to validate class data
const validateClass = [
	body("name").notEmpty().withMessage("Class name is required."),
	body("schedule").notEmpty().withMessage("Schedule is required."),
	body("trainerId").notEmpty().withMessage("Trainer ID is required."),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateClass;
