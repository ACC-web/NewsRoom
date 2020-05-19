let contentfulConfig
const path = require('path')

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
        author: 'ACC',
        description: 'This newsroom includes a logo, photo and video gallery (with a search filter), facts sheets on a range of education topics, infographics for use by the media, a live stream of media releases, biographies of ACC topical experts and story starters.',
        siteUrl: 'https://www.acc.edu.au' // full path to this site - no ending slash
    },
  plugins: [
      'gatsby-transformer-remark',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-breadcrumb',
    'gatsby-plugin-sitemap',
      {
          resolve: 'gatsby-plugin-google-analytics',
          options: {
              trackingId: 'UA-9213011-1'
          },
      },
  ],
}
