import { gql } from "@apollo/client";

export const CreateProduct_Mutation = gql`
  mutation CreateProduct($content: contentProduct!) {
    createProduct(content: $content) {
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
`;
