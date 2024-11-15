class Database {
	constructor() {
		this.memberships = []; // Array to store memberships
		this.classes = [];      // Array to store classes
		this.trainers = [];     // Array to store trainers
	}

	// Membership methods
	addMembership(membership) {
		this.memberships.push(membership);
		return membership;
	}

	getMemberships() {
		return this.memberships;
	}

	// Class methods
	addClass(classInstance) {
		this.classes.push(classInstance);
		return classInstance;
	}

	getClasses() {
		return this.classes;
	}

	// Trainer methods
	addTrainer(trainer) {
		this.trainers.push(trainer);
		return trainer;
	}

	getTrainers() {
		return this.trainers;
	}
}

module.exports = new Database(); 
