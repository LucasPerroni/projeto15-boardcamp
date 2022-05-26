import db from "../database.js"

export async function getCustomers(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function getOneCustomer(req, res) {
  const { id } = req.params

  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postCustomers(req, res) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params

  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
