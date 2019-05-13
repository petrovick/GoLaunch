require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const validate = require('express-validation')
const databaseConfig = require('./config/database')

class App {
    constructor() {
        this.express = express();
        this.isDev = true;//process.env.NODE_ENV !== 'production'

        this.routes();
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        //this.express.use(Sentry.Handlers.requetHandler())
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exception(){
        

        this.express.use(async(err, req, res,next) => {
            if(err instanceof validate.ValidationError) {
                return res.state(err.status).json(err)
            }

            if(process.env.NODE_ENV != 'production') {
                const youch = new Youch(err, req)
                return res.json(await youch.toJSON())
            }
            
            return res.status(err.status || 500).json({error: 'User error connection.'})
        })
    }

}

module.exports = new App().express