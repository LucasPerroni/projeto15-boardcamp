import joi from "joi"
import DateExtension from "@joi/date"

const Joi = joi.extend(DateExtension)

export default function customerSchema(req, res, next) {
  // validate req.body format
  const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required(),
    birthday: Joi.date().format("YYYY-MM-DD").required(),
  })
  const validation = customerSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(400).send(validation.error.details.map((e) => e.message))
  }

  next()
}
