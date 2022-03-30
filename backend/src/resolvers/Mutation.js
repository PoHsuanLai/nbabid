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
        let {user, money} = input
        const username = db.userModel.findOne(user)
        // function calculate(bidFor, gameResult, bidMoney){
        //     const Winteam = gameResult.topScore>gameResult.botScore?top:bot
        //     return bidFor===Winteam?2*bidMoney:0
        // }
        // let returnValue = calculate(bidFor, gameResult, bidMoney)
        const id = username[id]
        const find = await db.userModel.findOneAndUpdate(
            {id},
            {
                $set: {
                    cash: username[cash]+money
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
        const newBid = new db.bids(input)
        await newBid.save()
        pubsub.publish("BID_CREATED",{
            bidCreated: newBid,
        })
        return newBid
    }
}

export {Mutation as default}