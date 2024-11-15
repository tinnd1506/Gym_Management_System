const express = require("express");
const validateClass = require("../middleware/classValidation");
const ClassService = require("../domain/Class/ClassService");

const router = express.Router();
const classService = new ClassService();

// Class routes
router.post("/", validateClass, (req, res) => {
	const { name, schedule, trainerId } = req.body;
	const classInstance = classService.createClass(name, schedule, trainerId);
	res.status(201).json(classInstance);
});

router.get("/", (req, res) => {
	const classes = classService.getAllClasses();
	res.json(classes);
});

module.exports = router;
