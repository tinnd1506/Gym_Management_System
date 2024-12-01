const express = require("express")
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const workoutRoutes = require("./workoutRoutes");

const router = express.Router()

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/workouts", workoutRoutes);

module.exports = router
