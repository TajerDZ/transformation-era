import { gql } from "@apollo/client";

export const UpdatePlanInProduct_Mutation = gql`
  mutation UpdatePlanInProduct(
    $idProduct: ID!
    $updatePlanInProductId: ID!
    $content: contentPlansProduct!
  ) {
    updatePlanInProduct(
      idProduct: $idProduct
      id: $updatePlanInProductId
      content: $content
    ) {
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
