const Promise = require('bluebird')
const path = require('path')

//https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
// Create pages for docs
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve('src/templates/blog-post-template.js');
  const bioTemplate = path.resolve('src/templates/biography-template.js');
  const newsTemplate = path.resolve('src/templates/news-template.js');

  // Individual doc and blog pages
  // All in one go
  return graphql(`
		{
          bios: allContentfulBiographies {
            edges {
              node {
                slug
              }
            }
          }   
        news: allContentfulNews {
            edges {
              node {
                slug
              }
            }
          }
        }
	`).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
      console.log(result.errors);
    }

    // Create biography pages
    result.data.bios.edges.forEach(({ node }) => {
      createPage({
        path: `/biographies/${node.slug}`,
        component: bioTemplate,
          context: {
              slug: node.slug
          }
      });
    });
      // Create blog pages
      result.data.news.edges.forEach(({ node }) => {
          createPage({
              path: `/media-releases/${node.slug}`,
              component: newsTemplate,
              context: {
                  slug: node.slug
              }
          });
      });
  });
};
