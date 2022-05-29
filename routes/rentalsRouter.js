import { Router } from "express"

import { getRentals, postRentals, finishRentals, deleteRentals } from "../controllers/rentalsController.js"
import { postRentalsMiddleware } from "../middlewares/postRentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", postRentalsMiddleware, postRentals)
rentalsRouter.post("/rentals/:id/return", finishRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter
