import { gql } from "@apollo/client";

export const AllInvoice_QUERY = gql`
  query AllInvoice($filter: [Filter], $pagination: Pagination) {
    allInvoice(filter: $filter, pagination: $pagination) {
      data {
        type
        price
        duration
        totalDiscount
        totalPrice
        subTotalPrice
        tva
        dueDate
        status
        order {
          id
          product {
            name
          }
        }
      }
      total
    }
  }
`;
