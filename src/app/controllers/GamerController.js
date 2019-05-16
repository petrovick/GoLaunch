const Gamer = require("../models/Gamer");
const mongoose = require("mongoose");

class GamerController {
  async addPoints(req, res) {
    const { game, points } = req.body;

    const gamer = await Gamer.findOne({
      user: req.userId
    });

    if (!gamer) {
      gamer = await Gamer.create({
        user: req.userId,
        games: [
          {
            game: "5cda19888074ce1139752a4f",
            points: 1
          }
        ]
      });
    } else {
      let gameExists = false;
      gamer.games.forEach(item => {
        if (item.game == game) {
          item.points = points;
          gameExists = true;
        }
      });
      if (!gameExists) {
        gamer.games.push({
          game,
          points
        });
      }
      Gamer.update(
        {
          _id: gamer._id
        },
        {
          games: gamer.games
        },
        {
          multi: false
        },
        function(err, numAffected) {
          return res.json({
            gamer,
            error: err,
            numAffected
          });
        }
      );
    }
    /*
    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid User/Password' })
    }
*/
  }

  async listAll(req, res) {
    const { game } = req.query;
    let gamers = [];
    if (game) {
      gamers = await Gamer.find({
        games: {
          $elemMatch: {
            game: game
          }
        }
      }).populate("user");
    } else {
      gamers = await Gamer.find()
        .populate("user")
        .populate("games.game");
    }

    return res.json(gamers);
  }

  async getGamer(req, res) {
    console.log("Entrou aqui no getGamer");
    console.log(`Gamer userId:${req.userId}`);
    const gamer = await Gamer.findOne({
      user: req.userId
    })
      .populate("games.game")
      .populate("user");
    console.log(gamer);
    return res.json(gamer);
  }
}

module.exports = new GamerController();
