import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from '../article-preview.module.css'
import {ItalicParagraph} from "../../styles/shared.ts";

const Container = styled.section`
     flex-direction: column;

  @media(min-width: 768px){
     display: inherit;
     flex-direction: inherit;
 }
`

const TextElements = styled.div`
  display: flex;
  flex-direction: column;
`
const BioName = styled.h3`
  margin-top: 0;
  a{
    text-decoration: none;
  }
`

const ProfileImage = styled(Img)`
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    @media(min-width: 768px){
        //width: 15rem;
        //height: calc(100% - 0);
        //margin: 0 2rem 0 0;
    }
`

const Button = styled(Link)`
  max-width: 15rem;
`



export default ({ news }) => (
  <Container className={styles.preview}>
      {/*//TODO: link to the original full size image*/}
      <Link to={`/${news.slug}`}>
          <ProfileImage className="image" alt="" fluid={news.image.fluid} />
      </Link>
      <TextElements>
        <BioName className={styles.previewTitle}>
          <Link to={`/${news.slug}`}>{news.title}</Link>
        </BioName>
          <ItalicParagraph className="grey5-fill">{news.datePublished}</ItalicParagraph>
          <p
              dangerouslySetInnerHTML={{
                  __html: news.bodyContent.childMarkdownRemark.excerpt
              }}
          />

          {/*<p>{news.mediaApprovedQuote.childMarkdownRemark.html}</p>*/}

          {/*<p> ${news.childContentfulNewsMediaApprovedQuoteTextNode.mediaApprovedQuote}</p>*/}
          {/*<ul><li*/}
          {/*    dangerouslySetInnerHTML={{*/}
          {/*        __html: news.publishedWork*/}
          {/*    }}*/}
          {/*/></ul>*/}
          <Button className={styles.ctaMain} style={{ boxShadow: `none` }} to={`/${news.slug}`}>Read More</Button>
      </TextElements>
  </Container>
)
