const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Gamer = mongoose.Schema({
  totalPoints: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  games: [{
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    points: {
      type: Number,
      required: true,
      default: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Gamer.plugin(mongoosePaginate)

module.exports = mongoose.model('Gamer', Gamer)
