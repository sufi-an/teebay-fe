import { gql } from "@apollo/client";

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
