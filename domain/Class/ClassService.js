const Database = require("../../infrastructure/Database");
const Class = require("./Class");

class ClassService {
	// Create a new class
	createClass(name, schedule, trainerId) {
		const newClass = new Class(Date.now().toString(), name, schedule, trainerId);
		return Database.addClass(newClass);
	}

	// Get all classes
	getAllClasses() {
		return Database.getClasses();
	}
}

module.exports = ClassService;
