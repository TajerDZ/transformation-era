import { gql } from "@apollo/client";

export const CreateOrder_Mutation = gql`
  mutation CreateOrder($content: contentOrder!) {
    createOrder(content: $content) {
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
        createdAt
        oldPlan {
          id
          name
        }
        oldPrice {
          id
          key
          value
          discount
        }
        oldProduct {
          id
          name
          price
        }
        status
        type
      }
      product {
        name
        id
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
`;
