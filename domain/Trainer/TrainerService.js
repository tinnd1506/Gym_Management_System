const Database = require("../../infrastructure/Database");
const Trainer = require("./Trainer");

class TrainerService {
	// Create a new trainer
	createTrainer(name, expertise) {
		const newTrainer = new Trainer(Date.now().toString(), name, expertise);
		return Database.addTrainer(newTrainer);
	}

	// Get all trainers
	getAllTrainers() {
		return Database.getTrainers();
	}
}

module.exports = TrainerService;
