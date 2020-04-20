import React from 'react'
import {graphql, Link} from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import styled from "styled-components";

import {
    ItalicParagraph,
    FeatureImage
} from '../styles/shared.ts';

import heroStyles from '../components/hero.module.css'

const Wrapper = styled.div`
  margin: 0 1rem;
  width: calc(100% - 2rem);
`

const ActiveCrumb = styled.span`
//TODO: restrict the length of the active crumb
`


class NewsTemplate extends React.Component {
  render() {
    const news = get(this.props, 'data.contentfulNews')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${news.title} | ${siteTitle}`} />
            <div className="breadcrumbs">
                <p>
                    <Link className="crumb" to="/">Home</Link>
                    |
                    <Link className="crumb" to="/news">News</Link>
                    |
                    <ActiveCrumb className="crumb active"
                          dangerouslySetInnerHTML={{
                              // __html: {biography.content.content},
                              //TODO: change this too be the same as the blog-post page html thingy
                              __html: news.title,

                          }}
                    />
                </p>
            </div>
          <div className={heroStyles.hero}>

          </div>
          <Wrapper>
              <FeatureImage
                  className={heroStyles.heroImage}
                  alt={news.title}
                  fluid={news.image.fluid}
              />
            <h1 className="section-headline">{news.title}</h1>
              <ItalicParagraph className="grey5-fill">{news.datePublished}</ItalicParagraph>
            <div
              dangerouslySetInnerHTML={{
                // __html: {news.content.content},
                //TODO: change this too be the same as the blog-post page html thingy
                __html: news.bodyContent.childMarkdownRemark.html,
              }}
            />
          </Wrapper>
        </div>
      </Layout>
    )
  }
}

export default NewsTemplate

export const pageQuery = graphql`
  query GetNews($slug: String!) {
      contentfulNews(slug: {eq: $slug}) {
          datePublished(formatString: "MMMM Do, YYYY")
          title
          slug
          bodyContent {
              childMarkdownRemark {
                  html
              }
          }
          image {
              fluid(maxWidth: 350, quality: 90) {
                  src
              }
          }
      }
  }

`
