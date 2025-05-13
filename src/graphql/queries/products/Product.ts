import { gql } from "@apollo/client";

export const Product_QUERY = gql`
  query Product($productId: ID) {
    product(id: $productId) {
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
        description
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
          duration
        }
      }
    }
  }
`;
