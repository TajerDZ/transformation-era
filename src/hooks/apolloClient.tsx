/* eslint-disable @typescript-eslint/no-explicit-any */
// src/apolloClient.ts
import useStore from "@/store/useStore";
import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { createUploadLink } from "apollo-upload-client";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from "@apollo/client/utilities";
const logout = (useStore.getState() as any).logout;
const authLink = setContext((_, { headers, operationName }) => {
  const token = (useStore.getState() as any).token;
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      "x-apollo-operation-name": operationName,
      "apollo-require-preflight": true,
    },
  };
});

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "wss://po4g80wsgo0o88swk8sscw0g.coolify.bi3li.cloud/graphql",
//     connectionParams: () => ({
//       Authorization: `Bearer ${(useStore.getState() as any).token || ""}`,
//     }),
//   })
// );

const httpLink = createUploadLink({
  uri: `https://po4g80wsgo0o88swk8sscw0g.coolify.bi3li.cloud/graphql`,
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors /*, networkError*/ }) => {
  if (typeof window !== "undefined") {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          logout();
          // window.location.href = "/"; // Redirect to login page
        }
      }
    }

    // if (networkError) {
    //   console.error("Network Error:", networkError);

    //   // التحقق من كود الخطأ 401 (غير مصرح)
    //   if ("statusCode" in networkError && networkError.statusCode === 401) {
    //     logout();
    //     window.location.href = "/";
    //   }

    //   // التحقق من أخطاء QUIC أو أي خطأ شبكة غير معروف
    //   if (
    //     networkError.message.includes("ERR_QUIC_PROTOCOL_ERROR") ||
    //     networkError.message.includes("Failed to fetch") ||
    //     networkError.message.includes("NetworkError") ||
    //     networkError.message.includes("ERR_CERT_AUTHORITY_INVALID")
    //   ) {
    //     useStore.setState({ isNetworkError: true });
    //     // window.location.href = "/"; // إعادة التوجيه إلى صفحة الخطأ
    //   }

    //   if (networkError.message.includes("ERR_NAME_NOT_RESOLVED")) {
    //     useStore.setState({ isError: true });
    //   }

    //   // if ("statusCode" in networkError && networkError.statusCode === 403) {
    //   //   //Todo:Fix this
    //   //   window.location.href = "/";
    //   //   // Replace old workspace ID with new one
    //   //   // navigate(newPath, { replace: true }); // Update URL without refreshing
    //   //   window.location.href = "/NotAccessFound"; // إعادة التوجيه إلى صفحة الخطأ
    //   // }
    // }
  }
});

// const splitLink =
//   typeof window !== "undefined"
//     ? split(
//         ({ query }) => {
//           const definition = getMainDefinition(query);
//           return (
//             definition.kind === "OperationDefinition" &&
//             definition.operation === "subscription"
//           );
//         },
//         // wsLink, // إرسال الاشتراكات عبر WebSocket
//         httpLink // إرسال باقي العمليات عبر HTTP
//       )
//     : httpLink; // في حالة الخادم، استخدم HTTP فقط

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
