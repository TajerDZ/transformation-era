import { gql } from "@apollo/client";

export const DeletePlanFromProduct_Mutation = gql`
  mutation DeletePlanFromProduct(
    $idProduct: ID!
    $deletePlanFromProductId: ID!
  ) {
    deletePlanFromProduct(idProduct: $idProduct, id: $deletePlanFromProductId) {
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
