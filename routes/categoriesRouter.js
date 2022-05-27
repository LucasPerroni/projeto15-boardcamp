import { Router } from "express"

import { getCategories, postCategories } from "../controllers/categoriesController.js"
import { postCategoriesMiddleware } from "../middlewares/postCategoriesMiddleware.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", postCategoriesMiddleware, postCategories)

export default categoriesRouter
