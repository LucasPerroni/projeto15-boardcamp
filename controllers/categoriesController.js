import db from "../database.js"

export async function getCategories(req, res) {
  try {
    const categories = await db.query(`SELECT * FROM categories`)
    res.send(categories.rows)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postCategories(req, res) {
  try {
    await db.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name])
    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}
