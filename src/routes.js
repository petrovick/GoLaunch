const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const controllers = require('./app/controllers')



//TEST
routes.get('/', controllers.TestController.index)


module.exports = routes;