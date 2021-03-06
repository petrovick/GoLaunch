const Gamer = require('../models/Gamer')
const mongoose = require('mongoose')

class GamerController {
  async addPoints (req, res) {
    const { game, points } = req.body

    const gamer = await Gamer.findOne({
      user: req.userId
    })
      .populate('user')
      .populate('games.game')

    if (!gamer) {
      gamer = await Gamer.create({
        user: req.userId,
        games: [
          {
            game: game,
            points: 1
          }
        ],
        totalPoints: 1
      })
    } else {
      let gameExists = false
      let totalPoints = 0
      gamer.games.forEach(item => {
        if (item.game._id == game) {
          item.points = points
          gameExists = true
          totalPoints += parseInt(points)
        } else {
          totalPoints += parseInt(item.points)
        }
      })
      debugger

      if (!gameExists) {
        gamer.games.push({
          game,
          points
        })
      }

      Gamer.update(
        {
          _id: gamer._id
        },
        {
          games: gamer.games,
          totalPoints: totalPoints
        },
        {
          multi: false
        },
        function (err, numAffected) {
          return res.json({
            gamer,
            error: err,
            numAffected
          })
        }
      )
    }
    /*
    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid User/Password' })
    }
*/
  }

  async listAll (req, res) {
    const { game } = req.query
    let gamers = []
    if (game) {
      gamers = await Gamer.find({
        games: {
          $elemMatch: {
            game: game
          }
        }
      })
        .populate('user')
        .populate('games.game')
    } else {
      gamers = await Gamer.find()
        .populate('user')
        .populate('games.game')
    }

    return res.json(gamers)
  }

  async getGamer (req, res) {
    console.log('Entrou aqui no getGamer')
    console.log(`Gamer userId:${req.userId}`)
    const gamer = await Gamer.findOne({
      user: req.userId
    })
      .populate('games.game')
      .populate('user')
    console.log(gamer)
    return res.json(gamer)
  }
}

module.exports = new GamerController()
