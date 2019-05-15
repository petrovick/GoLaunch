const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const cors = require('cors')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

express.use(cors)

// TEST
routes.get('/', controllers.TestController.index)

/**
 * Users & Sessions
 */
routes.post(
  '/user/create',
  // validate(validators.User),
  handle(controllers.UserController.save)
)
routes.post(
  '/session/login',
  // validate(validators.User),
  handle(controllers.SessionController.login)
)

/**
 * From now on Authentication is required
 */
routes.use(authMiddleware)

/**
 * List of Gamers
 */
routes.post('/game/add', handle(controllers.GameController.addGame))
routes.get('/game/list', handle(controllers.GameController.list))

/**
 * Gamer
 */
routes.post('/gamer/addpoint', handle(controllers.GamerController.addPoints))
routes.get('/gamer/listall', handle(controllers.GamerController.listAll))
routes.get('/gamer/getgamer', handle(controllers.GamerController.getGamer))

module.exports = routes
