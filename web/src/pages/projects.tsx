import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image";
import { Typography } from "@mui/material";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import ImageGrid from "../components/ImageGrid";
import { getPageId } from "../utils";

interface ProjectsData {
  page: {
    frontmatter: {
      description: string;
    };
  };
  projects: {
    nodes: {
      frontmatter: {
        title: string;
        caption: string;
        year: number;
        image: ImageDataLike;
      };
    }[];
  };
}

const ProjectsPage: React.FC<PageProps<ProjectsData>> = (props) => {
  const images = React.useMemo(
    () =>
      props.data.projects.nodes.map((node) =>
        getImage(node.frontmatter.image)!
      ),
    [props.data.projects.nodes]
  );
  const metadata = React.useMemo(
    () =>
      props.data.projects.nodes.map((node) => ({
        name: node.frontmatter.title,
        caption: node.frontmatter.caption,
        path: `/projects/${getPageId(node.frontmatter.title)}`,
        width: 4,
        year: node.frontmatter.year,
      })),
    [props.data.projects.nodes]
  );
  return (
    <Layout>
      <Typography fontWeight="bold" textAlign="center">
        <Markdown>{props.data.page.frontmatter.description}</Markdown>
      </Typography>
      <ImageGrid images={images} metadata={metadata} />
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    page: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/projects.md$/" }) {
      frontmatter {
        description
      }
    }
    projects: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/.*/content/pages/projects/.*\\.md$/" } }) {
      nodes {
        frontmatter {
          title
          year
          caption
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: NONE
                formats: [AUTO, WEBP, AVIF]
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
  }
`;
