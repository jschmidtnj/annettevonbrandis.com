import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box, Stack, Typography, Link, useMediaQuery, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

interface ContactData {
  site: {
    siteMetadata: {
      contactEmail: string;
      linkedin: string;
    };
  };
  backgroundLeft: ImageDataLike;
  backgroundRight: ImageDataLike;
}

const ContactPage: React.FC<PageProps<ContactData>> = (props) => (
  <Layout>
    <Stack textAlign="center" mt={20} spacing={20} justifyContent="center">
      <Box>
        <Typography
          variant="h5"
          component="h2"
          textTransform="capitalize"
          fontWeight="bold"
          mb={3}
        >
          Studio
        </Typography>
        <Link
          href={`mailto:${props.data.site.siteMetadata.contactEmail}`}
          underline="none"
          target="_blank"
        >
          {props.data.site.siteMetadata.contactEmail}
        </Link>
      </Box>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          textTransform="capitalize"
          fontWeight="bold"
          mb={2}
        >
          Social
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Link target="_blank" href={props.data.site.siteMetadata.linkedin}>
            <LinkedInIcon />
          </Link>
        </Stack>
      </Box>
    </Stack>
  </Layout>
);

export default ContactPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        contactEmail
        linkedin
      }
    }
    backgroundLeft: file(
      absolutePath: { regex: "/.*/content/assets/contact_background_left.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
    backgroundRight: file(
      absolutePath: { regex: "/.*/content/assets/contact_background_right.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
  }
`;
