import { gql } from "@apollo/client";

export const Cpanel_QUERY = gql`
  query Cpanel($idOrder: ID!) {
    cpanel(idOrder: $idOrder) {
      temporary
      is_locked
      suspendreason
      diskused
      domain
      ip
      maxpop
      maxftp
      max_emailacct_quota
      uid
      maxsql
      theme
      backup
      user
      suspendtime
      inodesused
      maxlst
      email
      has_backup
      disklimit
      maxsub
      suspended
      inodeslimit
      startdate
    }
  }
`;
