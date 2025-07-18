import { gql } from "@apollo/client";

export const AllProduct_QUERY = gql`
  query AllProduct($filter: [Filter], $pagination: Pagination) {
    allProduct(filter: $filter, pagination: $pagination) {
      total
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
          }
        }
      }
    }
  }
`;
