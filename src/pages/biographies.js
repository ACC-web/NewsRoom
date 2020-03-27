import React from 'react'
import {graphql, Link} from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BiographyPreview from '../components/biography-preview'

import {
  SectionHeadline,
  ArticleList
} from '../styles/shared.ts';

class BiographiesPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const biographies = get(this, 'props.data.allContentfulBiographies.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
              <div className="breadcrumbs">
                  <p><i>
                      <Link className="crumb" to="/">Home</Link>
                      |
                      <Link className="crumb" to="/biographies">Biographies</Link>
                  </i></p>
              </div>
            <SectionHeadline>Biographies</SectionHeadline>
            <ArticleList>
              {biographies.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <BiographyPreview biographies={node} />
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

export default BiographiesPage

export const pageQuery = graphql`
  query BiographiesPageQuery {
    allContentfulBiographies(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          name
          thumbnail {
            fluid(maxWidth: 350, quality: 100) {
              ...GatsbyContentfulFluid
              src
            }
            file {
              url
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          description {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          mediaApprovedQuote {
            childMarkdownRemark {
              html
            }
          }
          publishedWork
        }
      }
    }
  }
`
