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
