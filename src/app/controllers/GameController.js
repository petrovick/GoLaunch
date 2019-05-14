const Game = require('../models/Game')

class GameController {
  async addGame (req, res) {
    const { name } = req.body

    const game = await Game.findOne({ name })
    console.log(req.body)
    if (!game) {
      game = await Game.create(req.body)
    }

    return res.json({ game })
  }
  async list (req, res) {

    const games = await Game.find()

    return res.json(games)
  }
}

module.exports = new GameController()
