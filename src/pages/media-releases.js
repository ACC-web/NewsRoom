import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import NewsPreview from '../components/news/news-preview'

import {
  SectionHeadline,
  ArticleList
} from '../styles/shared.ts';

class NewsPage extends React.Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const newsitems = get(this, 'props.data.allContentfulNews.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
            {/*- start of breadcrumbs --*/}
            <div className="breadcrumbs">
                <Link href="/" className="crumb">
                    <i className="home"></i>
                </Link>
                <span className="crumb" to="/media-releases">Media Releases</span>
            </div>
            {/*- end of breadcrumbs --*/}
          <div className="wrapper">

            <SectionHeadline>Media Releases</SectionHeadline>
            <ArticleList>
              {newsitems.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <NewsPreview newsitems={node} />
                  </li>
                )
              })}
            </ArticleList>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NewsPage

export const pageQuery = graphql`
  query NewsPageQuery {
      site {
          siteMetadata {
              title
          }
      }
      allContentfulNews(sort: {fields: [datePublished], order: DESC}) {
          edges {
              node {
                  datePublished(formatString: "MMMM Do, YYYY")
                  title
                  slug
                  bodyContent {
                      childMarkdownRemark {
                          html
                          excerpt(pruneLength: 200)
                      }
                  }
                  image {
                      fluid(maxWidth: 350, quality: 95) {
                          ...GatsbyContentfulFluid
                          src
                      }
                  }
              }
          }
      }
  }
`
