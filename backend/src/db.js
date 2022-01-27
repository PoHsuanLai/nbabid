import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        id: {type: String, unique: true},
        username:{type: String, unique: true},
        password:{type: String, unique: true},
        cash:{type: Number},
        bid: {type: String},  
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

const userModel = mongoose.model('users', userSchema)
const games = mongoose.model('scores', gameSchema)

export {userModel, games}
