import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from './article-preview.module.css'

const Container = styled.div`
  a{
      text-decoration: none;
      color: hsla(0,0%,0%,0.8)
  }
`
const BioName = styled.h3`
  a{
    text-decoration: none;
  }
`

const ProfileImage = styled(Img)`
  height: 15rem;
  width: 100%;
`



export default ({ biographies }) => (
  <Container className={styles.preview}>
      <Link to={`/${biographies.slug}`}>
      {/*//TODO: link to the original full size image*/}
      <ProfileImage alt="" fluid={biographies.thumbnail.fluid} />
    <BioName className={styles.previewTitle}>
      <Link to={`/${biographies.slug}`}>{biographies.name}</Link>
    </BioName>

      <p
          dangerouslySetInnerHTML={{
              __html: biographies.description.childMarkdownRemark.html
          }}
      />

      {/*<p>{biographies.mediaApprovedQuote.childMarkdownRemark.html}</p>*/}

      {/*<p> ${biographies.childContentfulBiographiesMediaApprovedQuoteTextNode.mediaApprovedQuote}</p>*/}
      {/*<ul><li*/}
      {/*    dangerouslySetInnerHTML={{*/}
      {/*        __html: biographies.publishedWork*/}
      {/*    }}*/}
      {/*/></ul>*/}
      <Link className={styles.ctaMain} style={{ boxShadow: `none`, color: `#fff` }} to={`/${biographies.slug}`}>Read More</Link>
      </Link>
  </Container>
)
