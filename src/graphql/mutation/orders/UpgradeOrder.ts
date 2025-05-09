import { gql } from "@apollo/client";

export const UpgradeOrder_Mutation = gql`
  mutation UpgradeOrder($idOrder: ID!, $idPlan: ID, $idPrice: ID) {
    upgradeOrder(idOrder: $idOrder, idPlan: $idPlan, idPrice: $idPrice) {
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
