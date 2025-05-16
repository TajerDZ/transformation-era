import { gql } from "@apollo/client";

export const AddPlanToProduct_Mutation = gql`
  mutation AddPlanToProduct($idProduct: ID!, $content: contentPlansProduct!) {
    addPlanToProduct(idProduct: $idProduct, content: $content) {
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
