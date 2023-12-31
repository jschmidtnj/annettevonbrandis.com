import { resolve } from 'path';
import type { GatsbyNode } from "gatsby";
import { getPageId } from './src/utils';

interface ProjectData {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        title: string;
      };
    }[];
  };
}

interface StudentData {
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

  const projectData = await graphql<ProjectData>(`
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
  if (projectData.errors) {
    reporter.panicOnBuild(
      `Error loading projects`,
      projectData.errors
    )
    return;
  }

  const project = resolve(`./src/templates/project.tsx`);
  projectData.data!.allMarkdownRemark.nodes.map(node => {
    const pageId = getPageId(node.frontmatter.title);
    const slug = `/projects/${pageId}`
    const pagePath = `/.*/content/pages/projects/${pageId}\\.md$/`;
    createPage({
      path: slug,
      component: project,
      context: {
        pagePath
      }
    })
  });

  const studentData = await graphql<StudentData>(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/.*/content/pages/students/.*\.md$/" } }) {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `);
  if (studentData.errors) {
    reporter.panicOnBuild(
      `Error loading students`,
      studentData.errors
    )
    return;
  }

  const student = resolve(`./src/templates/student.tsx`);
  studentData.data!.allMarkdownRemark.nodes.map(node => {
    const pageId = getPageId(node.frontmatter.title);
    const slug = `/students/${pageId}`
    const pagePath = `/.*/content/pages/students/${pageId}\\.md$/`;
    createPage({
      path: slug,
      component: student,
      context: {
        pagePath
      }
    })
  });
};
