import db from "../database.js"

export async function getGames(req, res) {
  const { name } = req.query

  let query
  if (name) {
    query = `
      SELECT games.*, categories.name as "categoryName"
      FROM games
      JOIN categories ON games."categoryId" = categories.id
      WHERE LOWER(games.name) LIKE '${name}%'
    `
  } else {
    query = `
      SELECT games.*, categories.name as "categoryName"
      FROM games
      JOIN categories ON games."categoryId" = categories.id
    `
  }

  try {
    const games = await db.query(query)
    res.send(games.rows)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body

  try {
    await db.query(
      `
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5)
    `,
      [name, image, stockTotal, categoryId, pricePerDay]
    )
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}
