import { gql } from "@apollo/client";

export const UpdateOrder_Mutation = gql`
  mutation UpdateOrder($updateOrderId: ID!, $content: contentOrder!) {
    updateOrder(id: $updateOrderId, content: $content) {
      status
      data {
        createdAt
        deleted
        deletedAt
        id
        renewalDate
        section
        status
        updatedAt
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
          description
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
        plan {
          id
          name
          description
          prices {
            id
            key
            value
            discount
          }
        }
        price
        pricePlans {
          discount
          id
          key
          value
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
