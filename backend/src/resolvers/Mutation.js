const Mutation = {
    createUser: async(parent, { input }, { db, pubsub }) => {
        const newUser = new db.userModel(input)
        await newUser.save()
        pubsub.publish("USER_CREATED",{
            userCreated: newUser,
        })
        return newUser
    },
    updateCash: async(parent, { input }, { db, pubsub }) => {
        let {id, gameId, bidMoney, bidFor} = input
        const gameResult = db.scores.findOne(gameId)
        function calculate(bidFor, gameResult, bidMoney){
            const Winteam = gameResult.topScore>gameResult.botScore?top:bot
            return bidFor===Winteam?2*bidMoney:0
        }
        let returnValue = calculate(bidFor, gameResult, bidMoney)
        const find = await db.userModel.findOneAndUpdate(
            {id},
            {
                $set: {
                    cash: returnValue
                }
            },
            {returnDocument: 'after'}
        )
        pubsub.publish("CASH_UPDATED"),{
            cashUpdated: id,
        }
        return find
    },
    createBid: async(parent, { name, bid, price }, {db, pubsub}) => {
        const newUser = await db.userModel.findOne({username: name})
        const newBid = bid.concat(' ', newUser.bid)
        const newCash = newUser.cash-price
        const id= newUser.id
        const update = await db.userModel.findOneAndUpdate(
            {id},
            {
                $set: {
                    cash: newCash,
                    bid: newBid
                }
            },
            {returnDocument: 'after'}
        )
        pubsub.publish("BID_CREATED"),{
            bidCreated: {
                username: name,
                cash: newCash,
            }
        }
        return update
    }
}

export {Mutation as default}