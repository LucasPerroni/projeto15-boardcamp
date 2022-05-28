import { Router } from "express"

import {
  getCustomers,
  getOneCustomer,
  postCustomers,
  updateCustomer,
} from "../controllers/customersController.js"
import customerSchema from "../middlewares/customerSchema.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getOneCustomer)
customersRouter.post("/customers", customerSchema, postCustomers)
customersRouter.put("/customers/:id", customerSchema, updateCustomer)

export default customersRouter
