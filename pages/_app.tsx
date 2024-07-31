import type { AppProps } from "next/app";

// ******************************************* //
import Head from "next/head";
import RootApp from "../components/layout/RootApp";

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
     
      <RootApp
        Component={Component}
        pageProps={pageProps}
      />
    </>
  );
}

export default App;
