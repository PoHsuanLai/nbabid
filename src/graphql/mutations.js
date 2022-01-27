import { gql } from '@apollo/client'

export const CREATE_USERS_MUTATION = gql`
    mutation createUser($input: signUpInput!){
        createUser(input: $input){
            id
            username
            password
            cash
            bid
        }
    }
`;

export const CREATE_BID_MUTATION = gql`
    mutation createBid($name: String!, $bid: String!, $price: Int!){
        createBid(name: $name, bid: $bid, price: $price){
            username
        }
    }
`