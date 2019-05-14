const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Game = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Game.plugin(mongoosePaginate)

module.exports = mongoose.model('Game', Game)
