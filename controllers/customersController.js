import db from "../database.js"

export async function getCustomers(req, res) {
  let { cpf } = req.query
  if (!cpf) {
    cpf = ""
  }

  try {
    const customers = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`)
    res.send(customers.rows)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function getOneCustomer(req, res) {
  const id = Number(req.params.id)

  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])
    if (!customer.rows[0]) {
      return res.sendStatus(404)
    }

    res.send(customer.rows[0])
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body

  try {
    // check if cpf is already in use
    const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
    if (customer.rows[0]) {
      return res.status(409).send("cpf already in use")
    }

    // insert new customer in table
    await db.query(
      `
      INSERT INTO customers 
      (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)
    `,
      [name, phone, cpf, birthday]
    )

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params
  const { name, phone, cpf, birthday } = req.body

  try {
    // check if cpf is in use and, if true, is in use by the owner based on the id
    const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])
    if (customer.rows[0]?.id !== Number(id) && customer.rows[0]) {
      return res.status(409).send("cpf already in use")
    }

    // update customer table
    await db.query(
      `
      UPDATE customers
      SET name = $1, phone = $2, cpf = $3, birthday = $4
      WHERE id = $5
    `,
      [name, phone, cpf, birthday, id]
    )

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
