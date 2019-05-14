const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const {
  promisify
} = require('util')

module.exports = async (req, res, next) => {
  console.log('Entrou aqui')
  const authHeader = req.headers.authorization
  console.log('authHeader')
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({
      error: 'Token not provided'
    })
  }
  const [, token] = authHeader.split(' ')
  try {
    var decode = await promisify(jwt.verify)(token, authConfig.secret)
    //console.log(decode)
    req.userId = decode.id
    return next()
  } catch (err) {

    return res.status(401).json({
      error: 'Invalid Token'
    })
  }
}
