const express = require("express")

const membershipRoutes = require("./membershipRoutes")
const classRoutes = require("./classRoutes")
const trainerRoutes = require("./trainerRoutes")

const router = express.Router()

// Use the routes
router.use("/memberships", membershipRoutes)
router.use("/classes", classRoutes)
router.use("/trainers", trainerRoutes)

module.exports = router
