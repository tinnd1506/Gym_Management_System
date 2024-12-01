const express = require("express")
require("dotenv").config()
const corsMiddleware = require('./middleware/corsMiddleware')
const routes = require("./routes/index")
const db = require("./infrastructure/Database")
const errorHandler = require('./middleware/errorMiddleware');

const app = express()
const port = parseInt(process.env.PORT, 10) || 3000

app.use(corsMiddleware)
app.use(express.json())
app.use("/api", routes)

app.get("/", (req, res) => {
	res.json({
		msg: "Welcome to the Gym Management System API 🚀",
		status: "running"
	})
})

app.use(errorHandler);

db.initDb().then(() => {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`)
	})
}).catch(err => {
	console.error("Failed to initialize the database:", err)
	process.exit(1)
})
