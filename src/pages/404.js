import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from "styled-components";

import {
  SectionHeadline,

} from '../styles/shared.ts';

const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`

const Title = styled.p`
  font-weight: 800;
  margin: 1rem 0 0.5rem 0;
`

const Link = styled.a`
  margin: 0.5rem 0;
  color: black;
  text-decoration: none;
  
  &:hover{
    color: #023E83;
    text-decoration: underline;
  }
`

class MediaPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <SectionHeadline>404 page not found</SectionHeadline>
              <p>Oopsies!</p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MediaPage
