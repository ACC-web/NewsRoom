import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BiographyPreview from '../components/biography-preview'

import {
  SectionHeadline,
  ArticleList
} from '../styles/shared.ts'

class BiographiesPage extends React.Component {
    render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const biographies = get(this, 'props.data.allContentfulBiographies.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
              {/*- start of breadcrumbs --*/}
              <div className="breadcrumbs">
                  <Link href="/" className="crumb">
                      <i className="home"></i>
                  </Link>
                  <span className="crumb" to="/biographies">Biographies</span>
              </div>
              {/*- end of breadcrumbs --*/}
            <SectionHeadline>Biographies</SectionHeadline>
              <p>The people listed on this page are available to provide comments within their areas of expertise. You can also download their photograph and access approved quotes and previously published works.</p>
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
      site {
          siteMetadata {
              title
          }
      }
      allContentfulBiographies(sort: {order: ASC, fields: name}) {
      edges {
        node {
          slug
          name
          thumbnail {
            fluid(maxWidth: 350, quality: 100) {
              ...GatsbyContentfulFluid
              src
            }
            file {
              url
            }
            title
          }
          content {
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
          publishedWork {
              childMarkdownRemark {
                html
              }
          }
          mediaLink {
              mediaTitle
              mediaUrl
              publication
              datePublished
            }
        }
      }
    }
  }
`
