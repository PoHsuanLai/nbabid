import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        id: {type: String, unique: true},
        username:{type: String, unique: true},
        password:{type: String, unique: true},
        cash:{type: Number}, 
    },
    {versionKey: false},
    {
    collection: 'users'
    }
)
const gameSchema = new mongoose.Schema(
    {
        date: {type: String},
        top: {type: String},
        topScore: {type: Number},
        bot: {type: String},
        botScore: {type: Number},
    },
    {versionKey: false},
    {collection: 'scores'}
)
const bidSchema = new mongoose.Schema(
    {
        id: {type: String, unique: true},
        gameID:{type: String, unique: true},
        user:{type: String, unique: true},
        bidFor:{type: String},
        bidMoney: {type: Number},  
        result:{type: Number},
    }
)

const userModel = mongoose.model('users', userSchema)
const games = mongoose.model('scores', gameSchema)
const bids = mongoose.model('bids',bidSchema)

export {userModel, games, bids}
