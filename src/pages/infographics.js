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

const Infographic = styled(Img)`
  height: auto;
  width: 100%;
  position: relative;
`

class InfographicPage extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const infographics = get(this, 'props.data.infographics.edges')

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title={siteTitle} />
                    <Container>
                        <div className="breadcrumbs">
                            <p><i>
                                <Link className="crumb" to="/">Home</Link>
                                |
                                <Link className="crumb" to="/infographics">Infographics</Link>
                            </i></p>
                        </div>
                        <SectionHeadline>Multimedia Gallery</SectionHeadline>
                        <ImageGallery>
                            {/*infographics*/}
                            {infographics.map(({ node }) => {
                                return (
                                    <Item className="gallery-image" key={node.infographicImage.src}>
                                        <a href={node.infographicImage.file.url} download='file' download target="_blank" rel="noopener noreferrer">
                                            <Infographic fluid={node.infographicImage.fluid} caption={node.caption} alt={node.caption}  />
                                            <p>{node.caption}</p>
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

export default InfographicPage

export const pageQuery = graphql`
    query InfographicQuery {
        infographics: allContentfulInfographic {
            edges {
              node {
                caption
                infographicImage {
                  fluid(maxWidth: 500, quality: 90) {
                        ...GatsbyContentfulFluid
                        src
                    }
                  file {
                    url
                  }
                }
              }
            }
          }
    }
`
