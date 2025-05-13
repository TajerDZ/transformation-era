import { gql } from "@apollo/client";

export const RenewOrder_Mutation = gql`
  mutation RenewOrder($idOrder: ID!, $idPrice: ID, $dueDate: Date) {
    renewOrder(idOrder: $idOrder, idPrice: $idPrice, dueDate: $dueDate) {
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
              duration
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
            duration
            key
            value
            discount
          }
        }
        price
        pricePlans {
          discount
          duration
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
