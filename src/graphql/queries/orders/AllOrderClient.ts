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
          prices {
            discount
            id
            key
            value
          }
        }
        pricePlans {
          discount
          id
          key
          value
        }
        domainName
        renewalDate
        section
        status
        updatedAt
        id
      }
    }
  }
`;
