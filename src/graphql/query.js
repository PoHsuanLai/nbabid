import { gql } from '@apollo/client'

export const GET_USERS_QUERY = gql`
    query GetUsersQuery($input: userQuery!) {
        users(input: $input) {
            id
            username
            password
            cash
        }
    }
`
export const GET_GAMES_QUERY = gql`
    query GetGamesQuery {
        games {
            id
            date
            top
            topScore
            bot
            botScore
        }
    }
`
export const GET_BIDS_QUERY = gql`
    query GetBidsQuery {
        bids(input: $input) {
            id
            gameID
            user
            bidFor
            bidMoney
            result
        }
    }
`