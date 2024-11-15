const express = require("express");
const validateTrainer = require("../middleware/trainerValidation");
const TrainerService = require("../domain/Trainer/TrainerService");

const router = express.Router();
const trainerService = new TrainerService();

// Trainer routes
router.post("/", validateTrainer, (req, res) => {
	const { name, expertise } = req.body;
	const trainer = trainerService.createTrainer(name, expertise);
	res.status(201).json(trainer);
});

router.get("/", (req, res) => {
	const trainers = trainerService.getAllTrainers();
	res.json(trainers);
});

module.exports = router;
