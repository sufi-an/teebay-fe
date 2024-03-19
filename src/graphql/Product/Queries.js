import { gql } from "@apollo/client";

export const getAllProducts = gql`
    query GetProductByUser($userId: String) {
        getProductByUser (userId:$userId) {
        category {
            id
            name
        }
        description
        id
        price
        rentPrice
        rentType
        title
        }
    }

   
`

export const GetProductById = gql`

query GetProductById($id: String!) {
    getProductById(id: $id) {
      category {
        id
        name
      }
      title
      description
      id
      price
      rentPrice
      rentType
    }
  }
`
