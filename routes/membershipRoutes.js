const express = require("express");
const validateMembership = require("../middleware/membershipValidation");
const MembershipService = require("../domain/Membership/MembershipService");

const router = express.Router();
const membershipService = new MembershipService();

// Membership routes
router.post("/", validateMembership, (req, res) => {
	const { memberId, startDate, endDate, type } = req.body;
	const membership = membershipService.createMembership(memberId, startDate, endDate, type);
	res.status(201).json(membership);
});

router.get("/", (req, res) => {
	const memberships = membershipService.getAllMemberships();
	res.json(memberships);
});

module.exports = router;
