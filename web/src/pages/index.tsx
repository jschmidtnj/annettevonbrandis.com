import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";

interface HomeData {
  markdownRemark: {
    frontmatter: {
      intro: string;
    };
  };
}

const HomePage: React.FC<PageProps<HomeData>> = (props) => (
  <Layout>
    <Stack textAlign="center" mt={20} spacing={20} justifyContent="center">
      <Typography fontWeight="bold" textTransform="uppercase">
        TODO - Add home page.
      </Typography>
      <Typography fontWeight="bold" textAlign="center">
        <Markdown>{props.data.markdownRemark.frontmatter.intro}</Markdown>
      </Typography>
    </Stack>
  </Layout>
);

export default HomePage;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/home.md$/" }) {
      frontmatter {
        intro
      }
    }
  }
`;
