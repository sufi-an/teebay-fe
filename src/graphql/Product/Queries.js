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
      userId
    }
  }
`

export const getAllRentByUser = gql`
query GetAllRentByUser($lenderId: String!) {
  getAllRentByUser(lenderId: $lenderId) {
    borrower {
      email
      firstName
      id
    }
    id
    lender {
      firstName
      email
      id
    }
    product {
      category {
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
}


`

export const getAllBorrowByUser = gql`
query GetAllBorrowByUser($borrowerId: String!) {
  getAllBorrowByUser(borrowerId: $borrowerId) {
    borrower {
      email
      firstName
      id
    }
    id
    lender {
      firstName
      email
      id
    }
    product {
      category {
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
}


`
export const getAllPurchaseByUser = gql`
query GetAllPurchaseByUser($buyerId: String!) {
  getAllPurchaseByUser(buyerId: $buyerId) {
    buyer {
      firstName
      email
      id
    }
    id
    product {
      category {
        name
      }
      description
      id
      price
      rentPrice
      rentType
      title
    }
    seller {
      email
      firstName
      id
    }
  }
}


`

export const getAllSalesByUser = gql`
query GetAllSalesByUser($sellerId: String!) {
  getAllSalesByUser(sellerId: $sellerId) {
    buyer {
      firstName
      email
      id
    }
    id
    product {
      category {
        name
      }
      description
      id
      price
      rentPrice
      rentType
      title
    }
    seller {
      email
      firstName
      id
    }
  }
}


`