import React from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import styled from "styled-components";

import Layout from "../components/layout";
import NewsPreview from "../components/news/news-preview";
import MediaContacts from "../components/SIDEBAR/media-contact/media-contact";
import MediaAssets from "../components/SIDEBAR/media-assets";
import VisitForm from "../components/SIDEBAR/visit-request-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 3rem 1rem 0 1rem;
  }
`;

const Feed = styled.section`
  width: 100%;
  margin-top: 0;
  order: 2;

  @media (min-width: 768px) {
    width: calc(75% - 1rem);
    margin-right: 1rem;
    order: 1;
  }
`;

const SectionHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const NewsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-top: 0;

  @media (min-width: 768px) {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }

  .section-headline {
    margin-top: 0;
  }
`;

const NewsItem = styled.li`
  display: flex;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  width: calc(100%);

  @media (min-width: 768px) {
    width: 100%;
    flex-direction: row;

    & .image {
      width: 250px;
      height: calc(100% - 1rem);
      margin: 0 1rem;
    }

    &:first-of-type {
      flex-direction: column;
      margin: 0;
    }
    &:first-of-type .image {
      width: 100%;
      height: 30rem;
      margin: 0 0 2rem 0;
    }
  }
`;

const Sidebar = styled.section`
  width: 100%;
  order: 1;
  @media (min-width: 768px) {
    order: 2;
    width: calc(25% - 1rem);
    border-left: 1px solid grey;
    padding-left: 1rem;
  }
`;

const MediaContainer = styled.div`
  width: calc(100% - 2rem);
  margin: 0 1rem 3rem 1rem;
`;

const ReadMore = styled(Link)`
  color: #2a333c;
  text-align: center;
  width: 100%;
  font-weight: bold;
  text-decoration: none;

  p {
    font-size: 80%;
  }
  &:hover {
    p {
      color: #0069b4;
    }
  }
`;

const MediaList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-top: 3rem;
  list-style: none;

  @media (min-width: 768px) {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }
  a {
    color: black;
    text-decoration: none;
  }
  & p.title {
    margin: 0 0 0.5rem 0;
    font-size: 90%;
  }
  & p.publication {
    font-size: 80%;
    margin: 0;
    line-height: 1.1rem;
  }
`;

class RootIndex extends React.Component {
  render () {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const newsitems = get(this, "props.data.news.edges");
    const media = get(this, "props.data.media.edges");
    const mediacontact = get(this, "props.data.mediacontact.edges");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />
          <Wrapper className="wrapper">
            <Feed>
              <NewsList>
                <h2 className="section-headline">Latest Media Releases</h2>
                {newsitems.map(({ node }) => {
                  return (
                    <NewsItem key={node.slug}>
                      <NewsPreview newsitems={node} />
                    </NewsItem>
                  );
                })}
              </NewsList>
              <ReadMore to={/media-releases/}>
                <p>See More Media Releases &#9660;</p>
              </ReadMore>

              <MediaList>
                <SectionHeading className="section-headline">
                  ACC in the Media
                </SectionHeading>

                {media.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <a
                        href={node.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="publication">{node.publication}</p>
                        <p className="title">
                          <strong>{node.mediaTitle}</strong>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </MediaList>
              <ReadMore to={/media/}>
                <p>See More Articles &#9660;</p>
              </ReadMore>
            </Feed>
            <Sidebar>
              <p style={{ fontSize: "80%" }}>
                ACC’s newsroom exists to help the media access facts, stories,
                comments, information, photographs and videos about our schools.
                Media representatives and educational bloggers can also request
                school visits and comments from our extensive list of subject
                matter experts.
              </p>
              <p style={{ fontSize: "80%" }}>
                This newsroom includes a logo, photo and video gallery (with a
                search filter), facts sheets on a range of education topics,
                infographics for use by the media, a live stream of media
                releases, biographies of ACC topical experts and story starters.
              </p>
              <MediaContainer>
                <h2 style={{ fontSize: "1.1rem" }}>Media Contacts</h2>
                {mediacontact.map(({ node }) => {
                  return <MediaContacts contact={node} />;
                })}
              </MediaContainer>
              <MediaAssets />
              {/*<iframe src="https://australianchristiancollege.formstack.com/forms/school_visit_request_form" style={{ border: 'none' }} title="School Visit Request Form" width="100%" height="800"></iframe>*/}
              <VisitForm />
            </Sidebar>
          </Wrapper>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;
//TODO: make the graphql calls unique with :news allContent etc etc.
export const pageQuery = graphql`
  query HomeQuery {
    news: allContentfulNews(
      limit: 3
      sort: { fields: [datePublished], order: DESC }
    ) {
      edges {
        node {
          datePublished(formatString: "MMMM Do, YYYY")
          title
          slug
          bodyContent {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 200)
            }
          }
          image {
            fluid(maxWidth: 350, quality: 90) {
              ...GatsbyContentfulFluid
              src
            }
          }
        }
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulBiographies(sort: { order: ASC, fields: name }) {
      edges {
        node {
          slug
          name
          thumbnail {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
            title
          }
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    media: allContentfulMediaLink(
      limit: 8
      sort: { fields: [datePublished], order: DESC }
    ) {
      edges {
        node {
          publication
          mediaUrl
          mediaTitle
        }
      }
    }
    mediacontact: allContentfulMediaContact {
      edges {
        node {
          id
          email
          name
          phone
          position
          companyName
          image {
            fixed(width: 100, height: 100, quality: 90) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`;
