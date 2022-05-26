import db from "../database.js"

export async function getRentals(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postRentals(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function finishRentals(req, res) {
  const { id } = req.params

  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params

  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
