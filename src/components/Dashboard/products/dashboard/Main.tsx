import { useState } from "react";
import Page from "./dahboardPage/Page";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Cpanel_QUERY } from "@/graphql/queries/Cpanel";

function Main() {
  const { orderId } = useParams();
  const [item, setItem] = useState<any>();

  const { loading } = useQuery(Cpanel_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      idOrder: orderId,
    },
    onCompleted: ({ cpanel: data }) => {
      setItem(data);
    },
  });
  return (
    <div className="space-y-5">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          {loading && <span className="ml-2 animate-spin">⏳</span>}
        </div>
      ) : (
        <Page item={item} />
      )}
    </div>
  );
}

export default Main;
