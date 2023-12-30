import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";

interface StudentsData {
  markdownRemark: {
    frontmatter: {
      description: string;
      images: ({
        image: ImageDataLike;
      } & ImageMetadata)[];
    };
  };
}

const StudentsPage: React.FC<PageProps<StudentsData>> = (props) => {
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
      <Typography fontWeight="bold" textAlign="center">
        <Markdown>{props.data.markdownRemark.frontmatter.description}</Markdown>
      </Typography>
      <ImageGrid images={images} metadata={metadata} />
    </Layout>
  );
};

export default StudentsPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/students.md$/" }) {
      frontmatter {
        description
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
