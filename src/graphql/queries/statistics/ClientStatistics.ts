import { gql } from "@apollo/client";

export const ClientStatistics_QUERY = gql`
  query ClientStatistics($idUser: ID) {
    clientStatistics(idUser: $idUser) {
      numberProductsServices
      numberDomains
      numberHostingPlan
      numberInvoices
    }
  }
`;
