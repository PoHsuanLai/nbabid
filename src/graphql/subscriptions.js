import { gql } from '@apollo/client'

export const USER_CREATED_SUBSCRIPTION = gql`
    subscription userCreated {
        userCreated {
            id
            username
            password
            cash
            bid
        }
    }
`;
export const CASH_UPDATED_SUBSCRIPTION = gql`
    subscription cashUpdated {
        cashUpdated {
            id
        }
    }
`;
export const BID_CREATED_SUBSCRIPTION = gql`
    subscription bidCreated {
        bidCreated {
            username
            cash
        }
    }
`