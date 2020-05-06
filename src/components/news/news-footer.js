import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from '../article-preview.module.css'
import {
    ItalicParagraph
} from "../../styles/shared.ts";

const Container = styled.section`
     flex-direction: column;

  @media(min-width: 768px){
     display: inherit;
     flex-direction: inherit;
 }
`

export default ({ newsitems }) => (
  <Container className={styles.preview}>
          <Link to={`/media-releases/${newsitems.slug}`}>{newsitems.title}</Link>
  </Container>
)
