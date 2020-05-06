//https://github.com/madebymutual/gatsby-craft-filtering-demo/blob/master/src/templates/news.js

import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'



import {
    SectionHeadline,

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

const Item = styled.li`
    width: 100%;
    margin: 0.5rem 0;
    position:relative;
  @media(min-width:576px){
    width: calc(50% - 1rem);
    margin: 0.5rem;
    //max-height: 9rem;
    position:relative;
  }
  @media(min-width:768px){
    width: calc(33.3333% - 1rem);
    margin: 0.5rem;
  }

  & a{
    text-decoration: none;
    color: #2a333c;

    &:before{
        content:"";
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADUElEQVRIDbWWzUtVQRiHu9EHJoSUJUjSwoKSTKmNFYG5adGitkULq5WtCoz+g7ZRmzDaRBkRlFSrWtii0EW5CBdFZBSp2YeppWVG3p7nej23c+8516PSwHNnzvv+Zt47c2beOaklCUo6na5CdggaYQdUwCisgE/wBG6mUqlO6sUVgm2FThiH3zAMP+APDMBPGAN9E/ACWhcclc4XYRQM0guXoAE2wFIHpi6DzdAC3TAEBn8PtfMKTodX8A364WjSzmjLoQNcBVelOVFfhM/BJbuTqEOEiL51MJUdpylCkjMhcoYGbMtZC1v4N8G1Qk/Ogr8EBuErRAfG4Tt0SeecIZrHWe2uXJjCFppqcBJ9sC6kwOAuddP0hxwxD+iegRumIUYSmNGcAnf/3cBoA8MjcJcm2jToEgfNju+m+gx1mcA0qsB/0psxJPhBO9+gh+njyrQ7vOfNTLMSzCr/qzxkYGMdMICNRhiDq/BfCulxmIG7wAxWb9CdsAoSbSJ0Cy1OrBSqDLoeXN5BWHRhJqmYQV5jL4FKg3pbDLEE09ShwgAX4HzIWOQBbQ3uHurlEbIBbMvEoF5PaxCWUeeXjRiO4QufsXwVz2j2UbkZTQKuXH7ZjmECRgzqfTgF4YyBgdm7s9/Afga9Th1Z8G3DcRucQAP9xiOE3sFpGPQfXgZ3VUuEMGPC9w4m4ZwG6uCc0q4AE4sJYObwRwyEz3P6C0odoAns1B2hDUz4zShf4CzMBt1N2wvdnH0wEOc18O2F79ATuHh4CR+hPDBGNPD7b7013mbb/tkROBEhD0z428CVOv6vsRWDA3YExpgGGoufJ9PgDXImRpox468BLxNPSbhg9BPDL4XY92IP/KvBJTVoJpeGRwo/obkP5vYjYc/MYLU43Aze+B7i2ILfwJlNFSvCgeYW+L4fxOpwNoNL5o1fHStM4KC/AR3HI1e8IHI3u1kMfrq4utBLH9/hPXCGcwecHQKxgfvAzeWSex+unfVH1fg9Fu5SN43vMHZJ45Kz78MMdQX2gO/Y7NUF3hYmb3PpFvDr3xRo7jbnTsJJstIN6oUVgvs52Q7O4AO4bLPFTOahN9P0QO4cFgkXO9OoPgxaj92ZVYI3xggMwlNmZjJPVP4CnxREQ4pBE9MAAAAASUVORK5CYII=)
        no-repeat
        center center;
        position: absolute;
        display: block;
        top: 0;
        right: 3%;
        z-index: 999;
        //color: #fff;
        border: 0;
        //background: transparent;
        box-sizing: border-box;
        width: 74px;
        height: 74px;

        //border-color: transparent transparent transparent #0069B4;
        transition: 100ms all ease;
        cursor: pointer;
        }
        &:hover{
          &:before {
            content:"";
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADUElEQVRIDbWWzUtVQRiHu9EHJoSUJUjSwoKSTKmNFYG5adGitkULq5WtCoz+g7ZRmzDaRBkRlFSrWtii0EW5CBdFZBSp2YeppWVG3p7nej23c+8516PSwHNnzvv+Zt47c2beOaklCUo6na5CdggaYQdUwCisgE/wBG6mUqlO6sUVgm2FThiH3zAMP+APDMBPGAN9E/ACWhcclc4XYRQM0guXoAE2wFIHpi6DzdAC3TAEBn8PtfMKTodX8A364WjSzmjLoQNcBVelOVFfhM/BJbuTqEOEiL51MJUdpylCkjMhcoYGbMtZC1v4N8G1Qk/Ogr8EBuErRAfG4Tt0SeecIZrHWe2uXJjCFppqcBJ9sC6kwOAuddP0hxwxD+iegRumIUYSmNGcAnf/3cBoA8MjcJcm2jToEgfNju+m+gx1mcA0qsB/0psxJPhBO9+gh+njyrQ7vOfNTLMSzCr/qzxkYGMdMICNRhiDq/BfCulxmIG7wAxWb9CdsAoSbSJ0Cy1OrBSqDLoeXN5BWHRhJqmYQV5jL4FKg3pbDLEE09ShwgAX4HzIWOQBbQ3uHurlEbIBbMvEoF5PaxCWUeeXjRiO4QufsXwVz2j2UbkZTQKuXH7ZjmECRgzqfTgF4YyBgdm7s9/Afga9Th1Z8G3DcRucQAP9xiOE3sFpGPQfXgZ3VUuEMGPC9w4m4ZwG6uCc0q4AE4sJYObwRwyEz3P6C0odoAns1B2hDUz4zShf4CzMBt1N2wvdnH0wEOc18O2F79ATuHh4CR+hPDBGNPD7b7013mbb/tkROBEhD0z428CVOv6vsRWDA3YExpgGGoufJ9PgDXImRpox468BLxNPSbhg9BPDL4XY92IP/KvBJTVoJpeGRwo/obkP5vYjYc/MYLU43Aze+B7i2ILfwJlNFSvCgeYW+L4fxOpwNoNL5o1fHStM4KC/AR3HI1e8IHI3u1kMfrq4utBLH9/hPXCGcwecHQKxgfvAzeWSex+unfVH1fg9Fu5SN43vMHZJ45Kz78MMdQX2gO/Y7NUF3hYmb3PpFvDr3xRo7jbnTsJJstIN6oUVgvs52Q7O4AO4bLPFTOahN9P0QO4cFgkXO9OoPgxaj92ZVYI3xggMwlNmZjJPVP4CnxREQ4pBE9MAAAAASUVORK5CYII=)
            no-repeat
            center center;
            position: absolute;
            display: block;
            top: 10px;
            right: 3%;
            z-index: 999;
            //color: #fff;
            border: 0;
            //background: transparent;
            box-sizing: border-box;
            width: 74px;
            height: 74px;

            //border-color: transparent transparent transparent #0069B4;
            transition: 100ms all ease;
            cursor: pointer;
           }
      }
  }

  &.Profile a{

      &:before{
        content:"";
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADEUlEQVRIDaWWzUtVQRiHu1GBtBE0gkgIRKhAlFZCBOY+aFu0uLQJg6DAv6JlGzFqqUSU0semINtELsRFCH1bQWr2fa0sK8ye59rc6z33nHPPvQ08nJl5f++8Z2bemXNyGzKU1dXVNmSHoRf2wXYowBZ4B/fgUi6XG+f5f4Vge2AcvsFv+AjfYQXm4AcsgrYleAQDDUfF+RwUwCDTMAg9sBM2OjDPZuiAfpiABTD4a+isKzgOT+ELzMKxrM5oW2EMXAVXJZ/JF+EDcMlGMznEiPDtgl//xumLkZS7EDlDAw6VexurMUYTzMMniA+MwT10SRueYfT1GKsdnMQMbKuw02GWmjSzFYZIA7uJMgnNEVNiE+1pMPuvVYjouAtmaWrSYH8JlsdQT2CT6j10FQNTaQPfZLriTWIaaDwiT8DyDDIFRncEPErDIegpGh7uwZg4VV3o1gd2oO4qUaQDTQt4kRSKJipX4QP0RLSJTbQGvg6WrIHvoH0D3d4qr8D93JkYJcGAzwhY9O9NkBW7sY+Cp+OQQXVYgeLVluYYZ8MvBKaaHBjbWXAbTxjIdV7gC/EnbtAMfbfXadISaw7dpiJEdj/d5DSHdeOWq/jkIZR82VJdQ3QRPCVHXd6H4K3RUS1N7kHvVyeUfLJyzYLwJnyFXoOeB2faX8sx2NGGffRSz4f+tCc6s/wnbDVoH5hME2lOwYYuBNSnO/SnPdEdAGc5VdLR8Fp7C62lzpgK9itgyRzQYdAPwTIcLw1LYwCc/lipM6aC3VJvwL34FKRqSDr9xfBPYe1SrlIU33gX9rqyHP0NWMva6JgYOsGvgcnRFLU30macy+AtdCvRH2MePD7z0J4ozGDA34CO86KmHJHZ7C+Gwc/UdIgI8HEP/Rg4w9oBgz9iA8+AyeWS+z1sCfa4J3aPhVlq0riHiUuaixvAPpz8p7kA+8E99p6+D4vwHLxLd4N//wfBu3szLMNJ7vIRno0Vgvs7OQzOwO+hyxaKN5mH3ptmCsrnMCVc4kzjfBjUG8iZ7QC/GJ9hHiaZ2RLPTOUvdieZTZe5YPkAAAAASUVORK5CYII=)
        no-repeat
        center center;
        position: absolute;
        display: block;
        top: 0;
        right: 3%;
        z-index: 999;
        //color: #fff;
        border: 0;
        //background: transparent;
        box-sizing: border-box;
        width: 74px;
        height: 74px;

        //border-color: transparent transparent transparent #0069B4;
        transition: 100ms all ease;
        cursor: pointer;
      }
  }
  &.Profile a:hover{

      &:before{
        content:"";
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADEUlEQVRIDaWWzUtVQRiHu1GBtBE0gkgIRKhAlFZCBOY+aFu0uLQJg6DAv6JlGzFqqUSU0semINtELsRFCH1bQWr2fa0sK8ye59rc6z33nHPPvQ08nJl5f++8Z2bemXNyGzKU1dXVNmSHoRf2wXYowBZ4B/fgUi6XG+f5f4Vge2AcvsFv+AjfYQXm4AcsgrYleAQDDUfF+RwUwCDTMAg9sBM2OjDPZuiAfpiABTD4a+isKzgOT+ELzMKxrM5oW2EMXAVXJZ/JF+EDcMlGMznEiPDtgl//xumLkZS7EDlDAw6VexurMUYTzMMniA+MwT10SRueYfT1GKsdnMQMbKuw02GWmjSzFYZIA7uJMgnNEVNiE+1pMPuvVYjouAtmaWrSYH8JlsdQT2CT6j10FQNTaQPfZLriTWIaaDwiT8DyDDIFRncEPErDIegpGh7uwZg4VV3o1gd2oO4qUaQDTQt4kRSKJipX4QP0RLSJTbQGvg6WrIHvoH0D3d4qr8D93JkYJcGAzwhY9O9NkBW7sY+Cp+OQQXVYgeLVluYYZ8MvBKaaHBjbWXAbTxjIdV7gC/EnbtAMfbfXadISaw7dpiJEdj/d5DSHdeOWq/jkIZR82VJdQ3QRPCVHXd6H4K3RUS1N7kHvVyeUfLJyzYLwJnyFXoOeB2faX8sx2NGGffRSz4f+tCc6s/wnbDVoH5hME2lOwYYuBNSnO/SnPdEdAGc5VdLR8Fp7C62lzpgK9itgyRzQYdAPwTIcLw1LYwCc/lipM6aC3VJvwL34FKRqSDr9xfBPYe1SrlIU33gX9rqyHP0NWMva6JgYOsGvgcnRFLU30macy+AtdCvRH2MePD7z0J4ozGDA34CO86KmHJHZ7C+Gwc/UdIgI8HEP/Rg4w9oBgz9iA8+AyeWS+z1sCfa4J3aPhVlq0riHiUuaixvAPpz8p7kA+8E99p6+D4vwHLxLd4N//wfBu3szLMNJ7vIRno0Vgvs7OQzOwO+hyxaKN5mH3ptmCsrnMCVc4kzjfBjUG8iZ7QC/GJ9hHiaZ2RLPTOUvdieZTZe5YPkAAAAASUVORK5CYII=)
        no-repeat
        center center;
        position: absolute;
        display: block;
        top: 10px;
        right: 3%;
        z-index: 999;
        //color: #fff;
        border: 0;
        //background: transparent;
        box-sizing: border-box;
        width: 74px;
        height: 74px;

        //border-color: transparent transparent transparent #0069B4;
        transition: 100ms all ease;
        cursor: pointer;
      }
  }
  p{
    margin: 0.2rem 0;
    font-size: 80%;
  }
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

//TODO: insert the filter thing

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title={siteTitle} />
                    <Container>
                        <div className="breadcrumbs">
                            <p><i>
                                <Link className="crumb" to="/">Home</Link>
                                |
                                <Link className="crumb" to="/multimedia">Multimedia Gallery</Link>
                            </i></p>
                        </div>
                        <SectionHeadline>Multimedia Gallery</SectionHeadline>
                        <ImageGallery>
                            {items.map(({ node }) => {
                                return (
                                    <Item key={node.id}>
                                        <a href={node.asset.file.url} download='file' download target="_blank" rel="noopener noreferrer">
                                        <Photo fluid={node.asset.fluid} caption={node.caption} alt={node.caption} />

                                        <p><i>{node.caption}</i></p>
                                        <p>{node.categories.category}</p>
                                        </a>
                                    </Item>
                                )
                            })}

                            {items.map(({ node }) => {
                                return (
                                    <Item key={node.categories.id}>
                                            <p>{node.categories.category}</p>
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
    query MultiMediaQuery {
        items: allContentfulMultimediaItems {
            edges {
              node {
                id
                asset {
                  file {
                    url
                  }
                  id
                  fluid(maxWidth: 500, quality: 90) {
                        ...GatsbyContentfulFluid
                        src
                    }
                }
                categories {
                  category
                  id
                }
                caption
              }
            }
          }
    }
`
