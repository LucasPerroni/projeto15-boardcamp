import dayjs from "dayjs"

import db from "../database.js"

export async function getRentals(req, res) {
  let { customerId: searchCustomer, gameId: searchGame } = req.query
  if (!searchCustomer) {
    searchCustomer = ""
  }
  if (!searchGame) {
    searchGame = ""
  }

  try {
    const rentals = await db.query(
      `
      SELECT 
        rentals.*, 
        customers.name AS "customerName", 
        games.name AS "gameName", 
        categories.id AS "categoryId", 
        categories.name AS "categoryName"
      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id
      WHERE CAST(rentals."customerId" AS TEXT) LIKE '${searchCustomer}%'
        AND CAST(games.id AS TEXT) LIKE '${searchGame}%'
    `
    )

    const sendRentals = []
    for (let rental of rentals.rows) {
      const { customerName, gameName, categoryName, categoryId, ...rentalInfo } = rental
      rental = {
        ...rentalInfo,
        customer: {
          id: rentalInfo.customerId,
          name: customerName,
        },
        game: {
          id: rentalInfo.gameId,
          name: gameName,
          categoryId,
          categoryName,
        },
      }
      sendRentals.push(rental)
    }

    res.send(sendRentals)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body
  const { game } = res.locals

  try {
    const rentDate = dayjs().format("YYYY-MM-DD")
    const originalPrice = game.rows[0].pricePerDay * daysRented

    await db.query(
      `
      INSERT INTO rentals
      ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
      VALUES ($1, $2, $3, $4, $5)
    `,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    )

    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}

export async function finishRentals(req, res) {
  const { id } = req.params
  const returnDate = dayjs().format("YYYY-MM-DD")
  let delayFee = null

  try {
    const rental = await db.query(
      `
      SELECT rentals.*, games."pricePerDay" 
      FROM rentals 
      JOIN games ON games.id = rentals."gameId"
      WHERE rentals.id = $1
      `,
      [id]
    )

    // check if rental exists
    if (!rental.rows[0]) {
      return res.status(404).send("Rental not found")
    }

    // check if rental isn't finished
    if (rental.rows[0].returnDate) {
      return res.status(400).send("This rental is already finished")
    }

    // get delay fee
    const delay = Number(returnDate.slice(-2)) - Number(rental.rows[0].rentDate.toISOString().slice(8, 10))
    if (delay > rental.rows[0].daysRented) {
      delayFee = rental.rows[0].pricePerDay * (delay - rental.rows[0].daysRented)
    }

    await db.query(
      `
      UPDATE rentals 
      SET ("returnDate", "delayFee") = ('${returnDate}', ${delayFee})
      WHERE id = $1
    `,
      [id]
    )

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params

  try {
    const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id])

    // check if rental exists
    if (!rental.rows[0]) {
      return res.status(404).send("Rental not found")
    }

    // check if rental is already finished
    if (rental.rows[0].returnDate) {
      return res.status(400).send("Rental is already finished")
    }

    await db.query(`DELETE FROM rentals WHERE id = $1`, [id])

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
