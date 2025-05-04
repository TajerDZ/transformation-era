import { gql } from "@apollo/client";

export const UpdateProduct_Mutation = gql`
  mutation UpdateProduct($updateProductId: ID!, $content: contentProduct!) {
    updateProduct(id: $updateProductId, content: $content) {
      status
      data {
        createdAt
        deleted
        deletedAt
        description
        id
        name
        price
        thumbnail
        type
        updatedAt
        plans {
          id
          name
          details {
            id
            key
            value
          }
          prices {
            discount
            id
            key
            value
          }
        }
      }
    }
  }
`;
