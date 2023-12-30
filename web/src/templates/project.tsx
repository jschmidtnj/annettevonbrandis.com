import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";

interface ProjectData {
  markdownRemark: {
    frontmatter: {
      image: ImageDataLike;
      title: string;
      caption: string;
      description: string;
      story: string;
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

const ProjectPage: React.FC<PageProps<ProjectData>> = (props) => {
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
        caption: img.caption,
        showCaption: img.showCaption,
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
            title="Description"
            content={props.data.markdownRemark.frontmatter.description}
          />
        </Grid>
      </Grid>
      <ImageGrid images={images} metadata={metadata} />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query GetProject($pagePath: String!) {
    markdownRemark(fileAbsolutePath: { regex: $pagePath }) {
      frontmatter {
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: FULL_WIDTH
            )
          }
        }
        title
        caption
        description
        story
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
          caption
          showCaption
          width
          year
        }
      }
    }
  }
`;
