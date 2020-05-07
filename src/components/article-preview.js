import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import styles from './article-preview.module.css'

const ArticleName = styled.h3`
  a{
    text-decoration: none;
  }
`

export default ({ article }) => (
  <div className={styles.preview}>
      <Link to={`/${article.slug}`}>
          <Img alt="" fluid={article.heroImage.fluid} />
      </Link>
    <ArticleName className={styles.previewTitle}>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </ArticleName>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
      {/*<Link className={styles.ctaMain} to={`/${article.slug}`}>READ MORE</Link>*/}
  </div>
)
