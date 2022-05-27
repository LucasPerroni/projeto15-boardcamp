import joi from "joi"
import db from "../database.js"

export async function postGamesMiddleware(req, res, next) {
  // validate req.body format
  const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().min(0).required(),
    pricePerDay: joi.number().integer().min(0).required(),
    categoryId: joi.number().required(),
  })
  const validation = gameSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(400).send(validation.error.details.map((e) => e.message))
  }

  try {
    // check if name already exists
    const checkName = await db.query(`SELECT * FROM games WHERE games.name = '${req.body.name}'`)
    if (checkName.rows[0]) {
      return res.status(409).send("Name already exists")
    }

    // check if categoryId exists
    const checkCategory = await db.query(
      `SELECT * FROM categories WHERE categories.id = ${req.body.categoryId}`
    )
    if (!checkCategory.rows[0]) {
      return res.status(400).send("Category Id does not exist")
    }

    next()
  } catch (e) {
    res.sendStatus(500)
  }
}
