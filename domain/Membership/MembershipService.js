const Database = require("../../infrastructure/Database");
const Membership = require("./Membership");

class MembershipService {
	// Create a new membership
	createMembership(memberId, startDate, endDate, type) {
		const newMembership = new Membership(Date.now().toString(), memberId, startDate, endDate, type);
		return Database.addMembership(newMembership);
	}

	// Get all memberships
	getAllMemberships() {
		return Database.getMemberships();
	}
}

module.exports = MembershipService;
