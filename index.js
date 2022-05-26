import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import categoriesRouter from "./routes/categoriesRouter.js"
import gamesRouter from "./routes/gamesRouter.js"
import customersRouter from "./routes/customersRouter.js"
import rentalsRouter from "./routes/rentalsRouter.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use(categoriesRouter)
app.use(gamesRouter)
app.use(customersRouter)
app.use(rentalsRouter)

// port
const port = process.env.PORT || 4000
app.listen(port, () => console.log("express running"))
