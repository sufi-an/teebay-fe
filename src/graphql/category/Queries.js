import { gql } from "@apollo/client";

export const getAllCategories = gql`
query GetAllCategories {
    getAllCategories {
      id
      name
      slug
    }
  }

   
`