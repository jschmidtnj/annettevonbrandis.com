import * as React from "react";
import { Box, Container } from "@mui/material";
import Copyright from "./Copyright";
import Header from "./Header";

const Layout: React.FC<{
  children: React.ReactNode;
}> = (props) => (
  <>
    <Header mb={3} />
    <Container maxWidth="lg">
      <Box minHeight="100vh">
        {props.children}
      </Box>
      <Copyright my={4} />
    </Container>
  </>
);

export default Layout;
