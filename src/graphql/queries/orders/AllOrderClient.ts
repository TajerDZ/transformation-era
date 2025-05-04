import { gql } from "@apollo/client";

export const AllOrderClient_QUERY = gql`
  query AllOrderClient($idUser: ID) {
    allOrderClient(idUser: $idUser) {
      data {
        product {
          id
          name
          description
          price
          thumbnail
          type
          updatedAt
          plans {
            id
            name
            prices {
              discount
              id
              key
              value
            }
            details {
              id
              key
              value
            }
          }
        }
        price
        plan {
          id
          name
        }
        pricePlans {
          discount
          id
          key
          value
        }
        renewalDate
        section
        status
        updatedAt
        id
      }
    }
  }
`;
