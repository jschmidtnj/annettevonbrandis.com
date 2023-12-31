import * as React from "react";
import {
  Button,
  Stack,
  BoxProps,
  useMediaQuery,
  Box,
  useTheme,
  Container,
  Link as ExternalLink,
} from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { getFontFamily } from "../utils";
import Link from "./Link";

interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
      linkedin: string;
    };
  };
}

const MenuButton: React.FC<{
  handleClick: () => void;
  isOpen: boolean;
}> = (props) => (
  <Button
    variant="text"
    onClick={props.handleClick}
    sx={{ minWidth: 0, padding: 0 }}
    title={props.isOpen ? "Close" : "Open"}
  >
    {props.isOpen ? <MenuOpenIcon /> : <MenuIcon />}
  </Button>
);

const Social: React.FC<{
  siteMetadata: HeaderData["site"]["siteMetadata"];
  children?: React.ReactNode;
}> = (props) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {props.children}
    <ExternalLink target="_blank" pt={1} href={props.siteMetadata.linkedin}>
      <LinkedInIcon />
    </ExternalLink>
  </Stack>
);

const Header: React.FC<BoxProps> = (props) => {
  const [isClickedOpen, setIsClickedOpen] = React.useState(false);
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const isOpen = React.useMemo(
    () => !isNotSmall && isClickedOpen,
    [isNotSmall, isClickedOpen]
  );
  const toggleOpen = React.useCallback(
    () => setIsClickedOpen(!isClickedOpen),
    [setIsClickedOpen, isClickedOpen]
  );
  const data = useStaticQuery<HeaderData>(graphql`
    query {
      site {
        siteMetadata {
          title
          linkedin
        }
      }
    }
  `);
  return (
    <Box py={2} bgcolor="white" width="100%" position="sticky" top="0" boxShadow={2} zIndex={10} {...props}>
      <Container maxWidth="lg">
        <Stack
          direction={{ md: "row" }}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            width={{
              xs: "100%",
              sm: undefined,
            }}
            justifyContent={{
              xs: "space-between",
              sm: "center",
              md: "flex-start",
            }}
          >
            {!isNotSmall ? <Box /> : <Social siteMetadata={data.site.siteMetadata} />}
            <Link
              to="/"
              fontWeight="bold"
              textTransform="uppercase"
              fontFamily={getFontFamily("Secular One")}
              variant="h4"
              underline="none"
              whiteSpace="nowrap"
            >
              {data.site.siteMetadata.title}
            </Link>
            {isNotSmall ? null : (
              <MenuButton handleClick={toggleOpen} isOpen={isOpen} />
            )}
          </Stack>
          {!isOpen && !isNotSmall ? null : (
            <HeaderLinks
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "flex-end" }}
              linkProps={{
                textAlign: "center",
                variant: isNotSmall ? "h5" : "h3",
                component: "div"
              }}
            >
              {!isOpen ? null : <Social siteMetadata={data.site.siteMetadata} />}
            </HeaderLinks>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
