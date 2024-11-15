const { body, validationResult } = require("express-validator");

// Middleware to validate membership data
const validateMembership = [
	body("memberId").notEmpty().withMessage("Member ID is required."),
	body("startDate").isISO8601().withMessage("Start date must be a valid date."),
	body("endDate").isISO8601().withMessage("End date must be a valid date."),
	body("type").isIn(["monthly", "yearly"]).withMessage("Type must be either 'monthly' or 'yearly'."),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateMembership;
