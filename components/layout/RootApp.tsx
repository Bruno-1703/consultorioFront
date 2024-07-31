import CssBaseline from "@mui/material/CssBaseline";
import { memo } from "react";
import { Layout } from "./Layout";

const RootApp = (prop) => {
    //agregar apollo
  return (
    <>
      <CssBaseline />

      <Layout>
        <prop.Component {...prop} />
      </Layout>
    </>
  );
};

export default memo(RootApp);
