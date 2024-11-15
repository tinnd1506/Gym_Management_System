const express = require("express")
require("dotenv").config() 

const routes = require("./routes/index")

const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json())

// Use the routes
app.use("/api", routes)

app.get("/", (req, res) => {
	res.json({
		msg: "Welcome to the Gym Membership Application 🤸‍♂️",
	})
})

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
