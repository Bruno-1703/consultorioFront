import { ReactNode } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header } from "./Header";
import { Drawer } from "./Drawer";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { DrawerContextProvider } from "../context/drawer-context";


const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled(Box)`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: inherit;
`;

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  const { children } = props;

  return (
      <DrawerContextProvider>
        <OuterContainer>
          <Header />
          <Toolbar />
          <InnerContainer>
            <Drawer />
            <Main>{children}</Main>
          </InnerContainer>
          <Footer>Sistema gestión consultorios</Footer>
        </OuterContainer>
      </DrawerContextProvider>
    )
  

};
