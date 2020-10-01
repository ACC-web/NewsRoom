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

// Overwrite the Contentful config with environment variables if they exist
twitterConfig = {
    consumer_key: "EmUfJocNZvIGaT9aJM52ZEY6O",
    consumer_secret: "r1gd0TsWlW57afx8J7vv6Zm8Z1hUQgNMxVjzDRsTiMolQq3Ell",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAE5AHwEAAAAAaZD4%2BM%2B5wo%2BSGTUMsIRdBbtT%2B7U%3DLMjtfZPVfgF6fpMY7vHWWwoifz0dGlC48SdwVfHlbNoCfjXv4x",
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-breadcrumb',
    'gatsby-plugin-sitemap',
      {
          resolve: 'gatsby-plugin-google-analytics',
          options: {
              trackingId: 'UA-9213011-1'
          },
      },
      {
          resolve: `gatsby-source-rss-feed`,
          options: {
              url: `https://www.acc.edu.au/blog/rss.xml`,
              name: `ACCBlog`,
              // Optional
              // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
              parserOption: {
                  customFields: {
                      item: ['itunes:duration']
                  }
              }
          }
      },
      {
          resolve: `gatsby-source-twitter`,
          options: {
              credentials: {
                  consumer_key: "EmUfJocNZvIGaT9aJM52ZEY6O",
                  consumer_secret: "r1gd0TsWlW57afx8J7vv6Zm8Z1hUQgNMxVjzDRsTiMolQq3Ell",
                  bearer_token: "AAAAAAAAAAAAAAAAAAAAAE5AHwEAAAAAaZD4%2BM%2B5wo%2BSGTUMsIRdBbtT%2B7U%3DLMjtfZPVfgF6fpMY7vHWWwoifz0dGlC48SdwVfHlbNoCfjXv4x",
              },
              queries: {
                  getPosts: {
                      endpoint: "statuses/user_timeline",
                      params: {
                          screen_name: "smashingmag",
                          include_rts: false,
                          exclude_replies: true,
                          tweet_mode: "extended",
                      },
                  },
              },
          },
      },
  ],
}
