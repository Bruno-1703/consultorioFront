import CssBaseline from "@mui/material/CssBaseline";
import { memo, useEffect, useState } from "react";
import { Layout } from "./Layout";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";

const RootApp = (prop) => {
  const [apolloClient, setApolloClient] = useState(null);

  useEffect(() => {
    const createApolloClient = () => {
      return new ApolloClient({
        link: new HttpLink({
          uri: process.env.NEXT_PUBLIC_CONSULTORIO_API,
        }),
        cache: new InMemoryCache(),
      });
    };

    setApolloClient(createApolloClient());
  }, []);

  if (!apolloClient) {
    return <div />; 
  }

  return (
    <>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <prop.Component {...prop} />
        </Layout>
      </ApolloProvider>
    </>
  );
};

export default memo(RootApp);
