import React from 'react'
import { Link } from 'gatsby'
import styles from '../navigation.module.css'
import styled from 'styled-components'

const Container = styled.nav`
    
    ul{
      display: flex;
      flex-direction: column;
      
      @media(min-width: 768px){
        flex-direction: row;
      }
  }
`

const Item = styled(Link)`
  text-decoration: none;
  
  &hover{
    text-decoration: underline;
  }
`

export default () => (
  <Container role="navigation">
    <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
            <Item to="/">Home</Item>
        </li>
        <li className={styles.navigationItem}>
            <Item to="/news/">News</Item>
        </li>
        <li className={styles.navigationItem}>
            <Item to="/blog/">Blog</Item>
        </li>
        <li className={styles.navigationItem}>
            <Item to="/biographies/">Biographies</Item>
        </li>
    </ul>
  </Container>
)
