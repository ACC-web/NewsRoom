import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from '../article-preview.module.css'
import {
    ItalicParagraph
} from "../../styles/shared.ts";

const WrapperLink = styled.a`
  display: inherit;
  flex-direction: inherit;
  
  & :hover{
    cursor: pointer;
  }
  
  & p, a{
    text-decoration: none;
  }
`

const Container = styled.section`
     flex-direction: column;
     padding: 1rem;

  @media(min-width: 768px){
     display: inherit;
     flex-direction: inherit;
 }
 
 &:hover{
    background-color: #edeef2;
    border-radius: 5px;
 }
`

const TextElements = styled.div`
  display: flex;
  flex-direction: column;
  p{
    margin: 0.5rem 0;
     @media(min-width: 768px){
      margin: 0;
     }
  }
`
const BioName = styled.h3`
  margin: 0.5rem 0 0 0;
  a{
    text-decoration: none;
  }
`

const ProfileImage = styled(Img)`
    width: 100%;
    height: 250px;
    margin: 0;  
`

const Button = styled(Link)`
  max-width: 15rem;
`



export default ({ newsitems }) => (
    <WrapperLink to={`/media-releases/${newsitems.slug}`}>

    <Container className={styles.preview}>
      {/*//TODO: link to the original full size image*/}
          <ProfileImage className="image" alt="" fluid={newsitems.image.fluid} />
      <TextElements>
        <BioName className={styles.previewTitle}>
            <span>{newsitems.title}</span>
        </BioName>
          <ItalicParagraph className="grey5-fill extra-margin">{newsitems.datePublished}</ItalicParagraph>
          <p
              dangerouslySetInnerHTML={{
                  __html: newsitems.bodyContent.childMarkdownRemark.excerpt
              }}
          />

          {/*<p>{news.mediaApprovedQuote.childMarkdownRemark.html}</p>*/}

          {/*<p> ${news.childContentfulNewsMediaApprovedQuoteTextNode.mediaApprovedQuote}</p>*/}
          {/*<ul><li*/}
          {/*    dangerouslySetInnerHTML={{*/}
          {/*        __html: news.publishedWork*/}
          {/*    }}*/}
          {/*/></ul>*/}
          {/*<Button className={styles.ctaMain} style={{ boxShadow: `none` }} to={`/media-releases/${newsitems.slug}`}>Read More</Button>*/}
      </TextElements>
  </Container>
    </WrapperLink>

)
