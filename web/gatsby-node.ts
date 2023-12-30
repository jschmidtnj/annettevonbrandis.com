import { resolve } from 'path';
import type { GatsbyNode } from "gatsby";

interface ProjectData {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        title: string;
      };
    }[];
  };
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const project = resolve(`./src/templates/project.tsx`);
  const result = await graphql<ProjectData>(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/.*/content/pages/projects/.*\.md$/" } }) {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `Error loading projects`,
      result.errors
    )
    return;
  }

  result.data!.allMarkdownRemark.nodes.map(node => {
    const pageId = node.frontmatter.title.replace(/\s+/g, '-').toLowerCase();
    const slug = `/projects/${pageId}`
    const pagePath = `/.*/content/pages/projects/${pageId}\\.md$/`;
    createPage({
      path: slug,
      component: project,
      context: {
        pagePath
      }
    })
  })
};
