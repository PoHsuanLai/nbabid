const Subscription = {
    userCreated: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator("USER_CREATED")
        },
    },
    cashUpdated: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator("CASH_UPDATED")
        }
    },
    bidCreated: {
        subscribe: (parent, args, {pubsub})=>{
            return pubsub.asyncIterator("BID_CREATED")
        }
    }
}

export {Subscription as default}