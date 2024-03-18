import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
    query {
        getAllUsers {
        id
        firstName
        email
        }
    }
`
export const LoginQuery = gql`
    query($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }

`