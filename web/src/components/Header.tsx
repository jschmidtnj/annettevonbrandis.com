import * as React from "react";
import {
  Button,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
  Box,
  useTheme,
  Link as ExternalLink,
} from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import { navigate } from "gatsby";
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
}> = (props) => (
  <Button
    variant="text"
    onClick={props.handleClick}
    sx={{ minWidth: 0, padding: 0 }}
  >
    <MenuIcon />
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

const Header: React.FC<StackProps> = (props) => {
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
    <Stack
      mt={4}
      direction={{ md: "row" }}
      justifyContent="space-between"
      width="100%"
      {...props}
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
          <MenuButton handleClick={toggleOpen} />
        )}
      </Stack>
      {!isOpen && !isNotSmall ? null : (
        <HeaderLinks
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-end" }}
          linkProps={{
            textAlign: "center",
            variant: isNotSmall ? "h5" : "h3",
          }}
        >
          {!isOpen ? null : <Social siteMetadata={data.site.siteMetadata} />}
        </HeaderLinks>
      )}
    </Stack>
  );
};

export default Header;
