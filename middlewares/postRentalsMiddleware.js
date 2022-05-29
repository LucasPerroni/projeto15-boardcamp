import joi from "joi"

import db from "../database.js"

export async function postRentalsMiddleware(req, res, next) {
  // validate req.body format
  const rentalSchema = joi.object({
    customerId: joi.number().integer().min(1).required(),
    gameId: joi.number().integer().min(1).required(),
    daysRented: joi.number().integer().min(1).required(),
  })
  const validation = rentalSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(400).send(validation.error.details.map((e) => e.message))
  }

  const { customerId, gameId, daysRented } = req.body
  try {
    // check if customer exists
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
    if (!customer.rows[0]) {
      return res.status(400).send("Customer not found")
    }

    // check if game exists
    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])
    if (!game.rows[0]) {
      return res.status(400).send("Game not found")
    }

    // check if game is out of stock
    const allGameRentals = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
      [gameId]
    )
    if (allGameRentals.rows.length >= game.rows[0].stockTotal) {
      return res.status(400).send("Game out of stock")
    }

    res.locals.game = game
    next()
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}
