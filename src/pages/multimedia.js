//https://github.com/madebymutual/gatsby-craft-filtering-demo/blob/master/src/templates/news.js
//TODO: add infinite scroll https://github.com/jaredpalmer/react-simple-infinite-scroll
import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'

import {
    SectionHeadline,
    Item
} from '../styles/shared.ts'

const Container = styled.div`
  margin: 1rem 1rem 3rem 1rem;
`

// const Title = styled.p`
//   font-weight: 800;
//   margin: 1rem 0 0.5rem 0;
// `

const ImageGallery = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 100%;
`

const Photo = styled(Img)`
  height: 15rem;
  width: 100%;
  position: relative;
`

class MultimediaPage extends React.Component {

    render () {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const items = get(this, 'props.data.items.edges')
        const cats = get(this, 'props.data.categories.edges')

//TODO: insert the filter thing

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title={siteTitle} />
                    <Container>
                        {/*- start of breadcrumbs --*/}
                        <div className="breadcrumbs">
                            <Link href="/" className="crumb">
                                <i className="home"></i>
                            </Link>
                            <span className="crumb" to="/">Multimedia Gallery</span>
                        </div>
                        {/*- end of breadcrumbs --*/}
                        <SectionHeadline>Multimedia Gallery</SectionHeadline>
                        <ImageGallery>
                            {items.map(({ node }) => {
                                return (
                                    <Item key={node.id}>
                                        <a href={node.asset.file.url} download='file' download target="_blank" rel="noopener noreferrer">
                                        <Photo fluid={node.asset.fluid} caption={node.caption} alt={node.caption} />

                                        <p><i>{node.caption}</i></p>
                                            <ul>
                                        <span>{node.categories.category}</span>
                                            </ul>
                                        </a>
                                    </Item>
                                )
                            })}
                        </ImageGallery>
                    </Container>
                </div>
            </Layout>
        )
    }
}

export default MultimediaPage

export const pageQuery = graphql`
    query MultiMediaQuery{
        site {
            siteMetadata {
                title
            }
        }
        items:   allContentfulMultimediaItems {
            edges {
              node {
                id
                caption
                asset {
                  file {
                    url
                  }
                  fluid(maxWidth: 370, quality: 50) {
                        ...GatsbyContentfulFluid_tracedSVG
                        src
                    }
                  description
                }
                categories {
                  category
                }
              }
            }
          }
          categories: allContentfulCategoriesForMultimedia {
            edges {
              node {
                category
              }
            }
          }
    }
`
