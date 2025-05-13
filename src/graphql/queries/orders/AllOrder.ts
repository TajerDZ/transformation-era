import { gql } from "@apollo/client";

export const AllOrder_QUERY = gql`
  query AllOrder($filter: [Filter], $pagination: Pagination) {
    allOrder(filter: $filter, pagination: $pagination) {
      total
      data {
        createdAt
        deleted
        deletedAt
        id
        renewalDate
        section
        status
        updatedAt
        domainName
        timeLine {
          id
          type
          createdAt
          status
          price
          duration
          renewalDate
          plan {
            id
            name
          }
          pricePlan {
            id
            key
            value
            discount
            duration
          }
        }
        updated
        product {
          name
          id
          type
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
        plan {
          id
          name
          description
          prices {
            id
            key
            value
            discount
            duration
          }
        }
        price
        pricePlans {
          discount
          id
          key
          value
          duration
        }
        user {
          email
          firstname
          lastname
          id
          thumbnail
          phone
        }
      }
    }
  }
`;
