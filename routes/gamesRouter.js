import { Router } from "express"

import { getGames, postGames } from "../controllers/gamesController.js"
import { postGamesMiddleware } from "../middlewares/postGamesMiddleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postGamesMiddleware, postGames)

export default gamesRouter
