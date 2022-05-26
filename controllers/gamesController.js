import db from "../database.js"

export async function getGames(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postGames(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
