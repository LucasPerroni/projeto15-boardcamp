import joi from "joi"
import db from "../database.js"

export async function postCategoriesMiddleware(req, res, next) {
  // validate req.body data
  const categorySchema = joi.object({
    name: joi.string().required(),
  })
  const validation = categorySchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(400).send(validation.error.details.map((e) => e.message))
  }

  try {
    // check if category name already exists
    const category = await db.query(`SELECT * FROM categories WHERE name = $1`, [req.body.name])
    if (category.rows[0]) {
      return res.sendStatus(409)
    }

    next()
  } catch (e) {
    res.sendStatus(500)
  }
}
