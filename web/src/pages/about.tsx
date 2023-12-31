import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Box, Link, Stack, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";

interface AboutData {
  site: {
    siteMetadata: {
      contactEmail: string;
      linkedin: string;
    };
  };
  markdownRemark: {
    frontmatter: {
      image: ImageDataLike;
      biography: string;
      education: string;
      awards: string;
      images: ({
        image: ImageDataLike;
      } & ImageMetadata)[];
    };
  };
}

const TextCard: React.FC<{
  title: string;
  content: string;
}> = (props) => (
  <Box>
    <Typography fontWeight="bold" textTransform="uppercase">
      {props.title}
    </Typography>
    <Markdown>{props.content}</Markdown>
  </Box>
);

const AboutPage: React.FC<PageProps<AboutData>> = (props) => {
  const heroImage = getImage(props.data.markdownRemark.frontmatter.image);
  const images = React.useMemo(
    () =>
      props.data.markdownRemark.frontmatter.images.map((img) =>
        getImage(img.image)!
      ),
    [props.data.markdownRemark.frontmatter.images]
  );
  const metadata = React.useMemo(
    () =>
      props.data.markdownRemark.frontmatter.images.map((img) => ({
        name: img.name,
        width: img.width,
        year: img.year,
      })),
    [props.data.markdownRemark.frontmatter.images]
  );
  return (
    <Layout>
      <GatsbyImage alt="about" image={heroImage!} />
      <Grid container mt={4} spacing={2}>
        <Grid xs={12}>
          <TextCard
            title="Artist Biography"
            content={props.data.markdownRemark.frontmatter.biography}
          />
        </Grid>
        <Grid xs={12}>
          <TextCard
            title="Education"
            content={props.data.markdownRemark.frontmatter.education}
          />
        </Grid>
        <Grid xs={12}>
          <TextCard
            title="Distinctions"
            content={props.data.markdownRemark.frontmatter.awards}
          />
        </Grid>
      </Grid>
      <Stack textAlign="center" mt={20} spacing={20} justifyContent="center">
        <Typography fontWeight="bold" textTransform="uppercase">
          Contact
        </Typography>
        <Box>
          <Typography
            variant="h5"
            component="h2"
            textTransform="capitalize"
            fontWeight="bold"
            mb={3}
          >
            Email
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
      <ImageGrid images={images} metadata={metadata} />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        contactEmail
        linkedin
      }
    }
    markdownRemark(
      fileAbsolutePath: { regex: "/.*/content/pages/about.md$/" }
    ) {
      frontmatter {
        biography
        education
        awards
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: FULL_WIDTH
            )
          }
        }
        images {
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                layout: FULL_WIDTH
              )
            }
          }
          name
          width
          year
        }
      }
    }
  }
`;
