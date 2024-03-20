import { gql } from "@apollo/client";


export const createProductMutation = gql`

mutation CreateProduct($title: String!, $description: String!, $price: Float!, $userId: String!, $category: [String], $rentPrice: Float, $rentType: String) {
  createProduct(title: $title, description: $description, price: $price, userId: $userId, category: $category, rentPrice: $rentPrice, rentType: $rentType)
}

`


export const updateProductMutation = gql`
mutation UpdateProduct($updateProductId: String!, $title: String, $category: [String], $description: String, $price: Float, $rentPrice: Float, $rentType: String) {
    updateProduct(id: $updateProductId, title: $title, category: $category, description: $description, price: $price, rentPrice: $rentPrice, rentType: $rentType)
  }
`;

export const rentProductMutation = gql`
mutation Mutation($productId: String!, $borrowerId: String!, $lenderId: String!) {
    createRent(productId: $productId, borrowerId: $borrowerId, lenderId: $lenderId)
  }
`

export const purchaseProductMutation = gql`
mutation CreatePurchase($productId: String!, $buyerId: String!, $sellerId: String!) {
    createPurchase(productId: $productId, buyerId: $buyerId, sellerId: $sellerId)
  }
`
export const deleteProductMutation = gql`

mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId)
}

`