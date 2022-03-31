import bcrypt from "bcryptjs"

const Query = {
    users: async (parent, args, {db}, info)=>{ 
        const users = await db.userModel.findOne({username: args.input.username})
        if(users===null) throw new Error('cant find username!')
        const correct = await bcrypt.compare(args.input.password, users.password)
        if(correct){
            return users
        }
        else throw new Error('wrong password!')
    },
    games: async (parent, args, {db}, info)=>{
        const games = await db.games.find()
        return games
    },
    bid: async (parent, args, {db}, info)=>{
        const bids = await db.bidModel.find({username: args.input.username})
        if(bids===null) throw new Error('cant find bid')
        return bids
    }
}

export {Query as default}