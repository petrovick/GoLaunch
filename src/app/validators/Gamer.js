const Joi = require('joi')

module.exports = {
  body: {
    totalPoints: Joi.string().required(),
    user: Joi.string().required()
  }
}
