import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image";
import Layout from "../components/Layout";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";

interface ProjectsData {
  markdownRemark: {
    frontmatter: {
      images: ({
        image: ImageDataLike;
      } & ImageMetadata)[];
    };
  };
}

const ProjectsPage: React.FC<PageProps<ProjectsData>> = (props) => {
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
      <ImageGrid images={images} metadata={metadata} />
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/art.md$/" }) {
      frontmatter {
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
