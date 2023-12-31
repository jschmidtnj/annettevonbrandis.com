import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid from "../components/ImageGrid";
import { getPageId } from "../utils";

interface StudentsData {
  page: {
    frontmatter: {
      description: string;
    };
  };
  students: {
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

const StudentsPage: React.FC<PageProps<StudentsData>> = (props) => {
  const images = React.useMemo(
    () =>
      props.data.students.nodes.map((node) =>
        getImage(node.frontmatter.image)!
      ),
    [props.data.students.nodes]
  );
  const metadata = React.useMemo(
    () =>
      props.data.students.nodes.map((node) => ({
        name: node.frontmatter.title,
        caption: node.frontmatter.caption,
        path: `/students/${getPageId(node.frontmatter.title)}`,
        width: 4,
        year: node.frontmatter.year,
      })),
    [props.data.students.nodes]
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

export default StudentsPage;

export const pageQuery = graphql`
  query {
    page: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/students.md$/" }) {
      frontmatter {
        description
      }
    }
    students: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/.*/content/pages/students/.*\\.md$/" } }) {
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
