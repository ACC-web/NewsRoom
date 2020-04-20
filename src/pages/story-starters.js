import React from "react";

import Accordion from "../components/Accordion";
import {graphql, Link} from "gatsby";
import get from 'lodash/get'

import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'styled-components'

import {
    SectionHeadline,
} from '../styles/shared.ts';

const StoryList = styled.div`
  width: 100%;
`

const StoryItem = styled.div`
  background-color: rgba(0,0,0,0.16);
  border-radius: 5px;
  padding: 0.5rem 1rem 1rem 1rem  ;
  margin: 1rem;
`

class StoryStarters extends React.Component {

    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const story = get(this, 'props.data.allContentfulStoryStarter.edges')

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title={siteTitle} />
                    <div className="wrapper">
                        <div className="breadcrumbs">
                            <p><i>
                                <Link className="crumb" to="/">Home</Link>
                                |
                                <Link className="crumb" to="/story-starter">Story Starters</Link>
                            </i></p>
                        </div>
                        <SectionHeadline>Story Starters</SectionHeadline>
                        <p>ACC is excited to provide media representatives and bloggers with the following story starters. Their purpose is to help trigger an interesting angle for your education-related story.</p>
                        <Accordion>
                            {story.map(({ node }) => {
                                return (
                                    <div key={node.slug} label={node.title}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: node.body.childMarkdownRemark.html
                                            }}
                                        />
                                    </div>
                                )
                            })}

                        </Accordion>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default StoryStarters

export const pageQuery = graphql`
  query StoriesPageQuery {
    allContentfulStoryStarter {
        edges {
          node {
            body {
              childMarkdownRemark {
                html
              }
            }
            title
          }
        }
      }
  }
`
