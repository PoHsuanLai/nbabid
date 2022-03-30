import { gql } from '@apollo/client'

export const CREATE_USERS_MUTATION = gql`
    mutation createUser($input: signUpInput!){
        createUser(input: $input){
            id
            username
            password
            cash
        }
    }
`
export const CREATE_BID_MUTATION = gql`
    mutation createBid($input: bidInput!){
        createBid(input: $input){
            id
            gameID
            user
            bidFor
            bidMoney
            result
        }
    }
`
export const UPDATE_CASH_MUTATION = gql`
    mutation updateCash($input: cashInput!){
        updateCash(input: $input){
            user
            money
        }
    }
`