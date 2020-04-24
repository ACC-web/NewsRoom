let contentfulConfig
const path = require(`path`)


try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken:
    process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
    pathPrefix: '/newsroom',
    siteMetadata: {
        title: 'ACC NewsRoom',
        author: `ACC`,
        description: 'A collection of articles relevant to parents with school-age children',
        siteUrl: 'https://www.acc.edu.au/newsroom' // full path to this site - no ending slash
    },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-breadcrumb`,
    `gatsby-plugin-sitemap`,
      // {
      //     resolve: `gatsby-plugin-feed`,
      //     options: {
      //         query: `
      //             {
      //               site {
      //                 siteMetadata {
      //                   title
      //                   description
      //                   siteUrl
      //                   site_url: siteUrl
      //                 }
      //               }
      //             }
      //           `,
      //         feeds: [
      //             {
      //                 // serialize: ({ query: { site, allcontentfulNews } }) => {
      //                 //     return allContentfulNews.edges.map(edge => {
      //                 //         return Object.assign({}, edge.node, {
      //                 //             description: edge.node.bodyContent.childMarkdownRemark.excerpt,
      //                 //             date: edge.node.datePublished,
      //                 //             url: site.siteMetadata.siteUrl + edge.node.slug,
      //                 //             guid: site.siteMetadata.siteUrl + edge.node.slug,
      //                 //             custom_elements: [{ "content:encoded": edge.node.bodyContent.childMarkdownRemark.html }],
      //                 //         })
      //                 //     })
      //                 // },
      //                 query: `
      //                 {
      //                   allContentfulNews(sort: {fields: [datePublished], order: DESC}) {
      //                     edges {
      //                         node {
      //                             datePublished(formatString: "MMMM Do, YYYY")
      //                             title
      //                             slug
      //                             bodyContent {
      //                                 childMarkdownRemark {
      //                                     html
      //                                     excerpt(pruneLength: 200)
      //                                 }
      //                             }
      //                             image {
      //                                 file {
      //                                   url
      //                                 }
      //                               }
      //                         }
      //                     }
      //                   }
      //                 }
      //               `,
      //                 output: "/rss.xml",
      //                 title: "ACC Media Releases",
      //                 // optional configuration to insert feed reference in pages:
      //                 // if `string` is used, it will be used to create RegExp and then test if pathname of
      //                 // current page satisfied this regular expression;
      //                 // if not provided or `undefined`, all pages will have feed reference inserted
      //                 match: "^/news/",
      //                 // optional configuration to specify external rss feed, such as feedburner
      //                 // link: "https://feeds.feedburner.com/gatsby/blog",
      //             },
      //         ],
      //     },
      // },
  ],
}
