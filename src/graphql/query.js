import { gql } from '@apollo/client'

export const GET_USERS_QUERY = gql`
    query GetUsersQuery($input: userQuery!) {
        users(input: $input) {
            id
            username
            password
            cash
            bid
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