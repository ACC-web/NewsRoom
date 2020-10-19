import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout'
import NewsPreview from '../components/news/news-preview'
import MediaContacts from '../components/SIDEBAR/media-contact/media-contact'
import MediaAssets from '../components/SIDEBAR/media-assets'
import VisitForm from '../components/SIDEBAR/visit-request-form'
import Accordion from '../components/Accordion'

// import Swiper core and required components
import SwiperCore, { Navigation, A11y, Autoplay } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper-bundle.css'

import MultimediaGallery from '../components/MultimediaGallery/MultimediaGallery'
import TwitterWidget from '../components/twitter-widget'
import initReactFastclick from 'react-fastclick';
initReactFastclick();

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 0 1rem;

  @media (min-width: 768px) {
    flex-direction: column;
    margin: 3rem 1rem 0 1rem;
  }
`

const BackgroundImage = styled(Img)`
  display: none;
  width: 100%;
  min-height: 75vh;
  max-height: 50rem;
  height: auto;
  
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  
  @media(min-width: 768px){
      display: block;
  }
`

const HomeTop = styled.div`
  display: flex;
  flex-direction: column;
  
  > div{
    //width: 50%;
    display: flex;
    flex-direction: column;
      
      &:nth-child(1){
      flex-grow: 1;
      }
      &:nth-child(2){
        flex-grow: 1;
        min-width: unset;
        margin-left: unset;
      }
  }
  
  @media(min-width: 768px){
      flex-direction: row;
      
      >div{
        display: flex;
          &:nth-child(1){
            flex: 1 1 66%
          }
          &:nth-child(2){
            flex: 2 2 33%;
            min-width: 300px;
            margin-left: 1rem;
          }
      }
  }
`

const SectionHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const NewsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 0;

  @media (min-width: 768px) {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }

  .section-headline {
    margin-top: 0;
  }
`

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
      height: calc(100%);
      margin: 0 1rem 0 0;
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
`

const Sidebar = styled.section`
  width: 100%;
  order: 1;
  & h1{
    font-size: 1.1rem
  }
  @media (min-width: 768px) {
    order: 2;
    width: calc(25% - 1rem);
    border-left: 1px solid grey;
    padding-left: 1rem;
  }
`

const MediaContainer = styled.div`
  width: calc(100%);
  margin: 0 1rem 3rem 0;
`

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
`

const MediaList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-top: 3rem;
  list-style: none;
  
  & li{
    margin-bottom: 0.5rem;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }
  a {
    color: black;
    text-decoration: none;
  }
  & p.publication {
    //font-size: 80%;
    margin: 0;
    line-height: 1.5rem;
    margin-bottom: 1px;
  }
  & p.title {
    margin: 0 0 0.5rem 0;
    //font-size: 80%;
  }
`

const Logo = styled(Img)`
    max-width: 150px;
    height: auto;
`




class RootIndex extends React.Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const media = get(this, 'props.data.media.edges')
    const mediacontact = get(this, 'props.data.mediacontact.edges')
    const story = get(this, 'props.data.storyStarters.edges')
    const logoSlide = get(this, 'props.data.slideData.edges')
    const medialogos = get(this, 'props.data.mediaLogos.childImageSharp.fluid')
    const backgroundfeature = get(this, 'props.data.homeBackground.childImageSharp.fluid')

      // install Swiper components
      SwiperCore.use([Navigation, A11y, Autoplay]);

    const galleryImages = get(this, 'props.data.galleryImages.edges')
   const infographic=get(this, 'props.data.infographic.edges')
   const galleryvideos = get(this, 'props.data.videos.edges')
   const logos = get(this, 'props.data.logos.edges')
  const filtercategories= get(this, 'props.data.categories.edges')
    const cats=['Online',
    'On Campus',
    'Primary School',
    'Secondary School',
    'Outside',
    'Inside'];
    return (
        <Layout location={this.props.location}>
            <BackgroundImage fluid={backgroundfeature} objectFit="cover" alt="Media Outlets" objectPosition="50% 50%" />

            <div style={{ background: '#fff' }}>
              <Helmet title={siteTitle} />

            <Wrapper className="wrapper">

                <HomeTop>
                    <div>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: '500' }}>Newsroom</h2>
                      <p style={{ marginTop: '0' }}>
                          This newsroom exists to help the media access facts, stories, comments, information, photographs and videos about our schools. Journalists and media representatives can also request school visits and expert comments.
                      </p>
                      <p>
                          This newsroom includes a logo, photo and video gallery, infographics for use by the media, a live stream of media releases and story starters.
                      </p>
                    </div>
                    <MediaContainer>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '1.47rem' }}>Media Contacts</h2>
                        {mediacontact.map(({ node }) => {
                            return <MediaContacts key={node.id} contact={node} />
                        })}
                    </MediaContainer>
                </HomeTop>
                <section>
                  <h2 className="section-headline">Story Starters</h2>
                  <Accordion>
                      {story.map(({ node }) => {
                          return (
                              <div key={node.id} label={node.title}>
                                      <span className="accordionContent">
                                          {node.image ? <a className="imageLink" href={node.image?.file.url}><img src={node.image?.fluid.src} /></a> : null}
                                          <span dangerouslySetInnerHTML={{
                                                  __html: node.body.childMarkdownRemark.html
                                              }}
                                          />
                                      </span>
                              </div>
                          )
                      })}

                  </Accordion>
                </section>
                <hr />
                <section style={{width:'1000'}}>
                    <MultimediaGallery filtercategories={filtercategories} logos={logos} galleryImages={galleryImages} galleryvideos={galleryvideos} infographic={infographic}  cats={cats}/>
                </section>

                {/*<Img fluid={medialogos} objectFit="cover" alt="Media Outlets" objectPosition="50% 50%" />*/}
                <h4 style={{ textAlign: 'center', fontWeight: '400', textTransform: 'uppercase' }}>Australian Christian College has received media coverage in</h4>
                <div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation
                        pagination={{ clickable: true }}
                        // scrollbar={{ draggable: true }}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false
                        }}

                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        {logoSlide.map(({ node }) => {
                            return (
                                <SwiperSlide key={node.id}>
                                    <Logo fluid={node.childImageSharp.fluid} style={{ width: '100%' }} objectFit="contain" alt="Media Outlets" objectPosition="50% 50%" />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                  <VisitForm />
          </Wrapper>
        </div>
      </Layout>
    );
  }
}

export default RootIndex

//TODO: make the graphql calls unique with :news allContent etc etc.
export const pageQuery = graphql`
  query HomeQuery {
      site {
          siteMetadata {
              title
          }
      }
     storyStarters: allContentfulStoryStarter {
        edges {
          node {
            id
            body {
              childMarkdownRemark {
                html
              }
            }
            title
            image {
              fluid(maxWidth: 500, quality: 60, cropFocus: CENTER) {
                src
              }
              file {
                url
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
    galleryImages:   allContentfulMultimediaItems {
      edges {
        node {
          id
          caption
          asset {
            file {
              url
              fileName
            }
            fluid(maxWidth: 370, quality: 50) {
              src
              srcSet
              sizes
            }
            description
          }
          categories {
            category
          }
        }
      }
    }
    categories: allContentfulCategoriesForMultimedia {
      edges {
        node {
          category
        }
      }
    }
    videos : allContentfulVimeo {
      edges {
        node {
          description
          vimeoUrl
          vimeoThumbnail {
            fluid {
              src
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    logos : allFile(filter: {dir: {regex: "\\/GENERIC/"}}) {
      edges {
        node {
          childImageSharp {
            fixed {
              src
              originalName
            }
          }
        }
      }
    }
    infographic : allContentfulInfographic {
      edges {
        node {
          caption
          infographicImage {
            fluid(maxWidth: 500, quality: 90) {
                  ...GatsbyContentfulFluid
                  src
              }
            file {
              url
              fileName
            }
          }
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
    mediaLogos: file(name: {eq: "acc-newsroom-logos"}) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
            src
          }
        }
    }
    slideData: allFile(filter: {dir: {regex: "\\\\/media/"}}) {
        edges {
            node {
                childImageSharp {
                    fluid(grayscale: true) {
                        tracedSVG
                        ...GatsbyImageSharpFluid
                    }
                }
                id
            }
        }
    }
      homeBackground: file(name: {eq: "home-background"}) {
          childImageSharp {
              fluid {
                  ...GatsbyImageSharpFluid
                  src
              }
          }
      }
  }
`;
