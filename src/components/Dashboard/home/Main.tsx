import { useQuery } from "@apollo/client";
import Cards from "./CardSection/Cards";
import WelcomeBanner from "./WelcomeBanner";
import { ClientStatistics_QUERY } from "@/graphql/queries/statistics/ClientStatistics";
import useStore from "@/store/useStore";

function Main() {
  const idUser = useStore((state: any) => state.idUser);
  const { data, loading } = useQuery(ClientStatistics_QUERY, {
    variables: {
      idUser: idUser,
    },
  });
  return (
    <div>
      <WelcomeBanner />
      <Cards data={data} loading={loading} />
    </div>
  );
}

export default Main;
