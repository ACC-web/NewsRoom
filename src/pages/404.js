import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

import {
  SectionHeadline,

} from '../styles/shared.ts';


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
