import joi from "joi"

export default function customerSchema(req, res, next) {
  // validate req.body format
  const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi
      .string()
      .pattern(/^[0-9]{11}$/)
      .required(),
    birthday: joi
      .string()
      .pattern(/^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/)
      .required(),
  })
  const validation = customerSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(400).send(validation.error.details.map((e) => e.message))
  }

  next()
}
