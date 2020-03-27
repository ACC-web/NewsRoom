import React from 'react'
import {graphql, Link} from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BiographyTemplate extends React.Component {
  render() {
    const biography = get(this.props, 'data.contentfulBiographies')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const bioName = get(this.props, 'data.site.siteMetadata.name')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${biography.title} | ${siteTitle}`} />
            <div className="breadcrumbs">
                <p><i>
                    <Link className="crumb" to="/">Home</Link>
                    |
                    <Link className="crumb" to="/biographies">Biographies</Link>
                    |
                    <span className="crumb"
                        dangerouslySetInnerHTML={{
                            // __html: {biography.content.content},
                            //TODO: change this too be the same as the blog-post page html thingy
                            __html: biography.name,

                        }}
                    />
                </i></p>
            </div>
          <div className={heroStyles.hero}>
            <Img
                className={heroStyles.heroImage}
                alt={biography.title}
                fluid={biography.thumbnail.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{biography.name}</h1>
            <a href={biography.thumbnail.file.url}>Download Press Photo</a>
            <div
              dangerouslySetInnerHTML={{
                // __html: {biography.content.content},
                //TODO: change this too be the same as the blog-post page html thingy
                __html: biography.content.childMarkdownRemark.html,

              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BiographyTemplate

export const pageQuery = graphql`
  query GetBiographies($slug: String!) {
    contentfulBiographies(slug: {eq: $slug}) {
      name
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      content {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      thumbnail {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
            src
        }
        file {
          url
        }
      }
    }
  }

`
