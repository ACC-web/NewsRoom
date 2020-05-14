import React, { Component } from 'react';
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from './article-preview.module.css'
import Modal from 'react-responsive-modal';

// MODAL https://www.npmjs.com/package/react-responsive-modal

const Container = styled.div`
  text-decoration: none;
  color: hsla(0,0%,0%,0.8);
  font-size: 0.8rem;
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 3px;
  
  &:hover{
    background-color: #edeef2;
    border-radius: 5px;
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

const PublishedWork = styled.span`

    p{
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.2rem;
      width: 100%;
     
      a{
       color: #0069b4;
       text-decoration: none;
     width: 100%;
      display: block;

      }
    }

`


// export default ({ biographies }) => (
    class BiographyPreview extends Component {

        state = {
            open: false,
        };

        onOpenModal = () => {
            this.setState({ open: true });
        };

        onCloseModal = () => {
            this.setState({ open: false });
        };

        render () {
            const { open } = this.state;

            return (
                <Container to={`/biographies/${this.props.biographies.slug}`} className={styles.preview}>
                    <Link to={`/biographies/${this.props.biographies.slug}`}>
                        {/*//TODO: link to the originaaagit commanl full size image*/}
                        {/*//TODO: make the alt tag a prop alt="{this.props.biographies.thumbnail.title}"*/}
                        <ProfileImage alt="Photograph of ACC Team Member" fluid={this.props.biographies.thumbnail.fluid}/>
                    </Link>
                    <BioName className={styles.previewTitle}>
                        <Link to={`/biographies/${this.props.biographies.slug}`}>{this.props.biographies.name}</Link>
                    </BioName>

                    <p>{this.props.biographies.content.childMarkdownRemark.excerpt}</p>

                    <p onClick={this.onOpenModal} style={{boxShadow: `none`, color: `#0069b4`, fontSize: `80%`}}>Media approved quotes</p>
                    {/*//TODO: make this a variable depending of whether published work exists*/}
                    {/*<p>Published works:</p>*/}
                    <PublishedWork
                        className={styles.breakcontents}
                        dangerouslySetInnerHTML={{
                            __html: this.props.biographies.publishedWork?.childMarkdownRemark.html
                        }}
                    />
                    {/*//TODO: Make linked media links appear below, I think I need to list them or something square brackets are in he graphql data later*/}
                    {/*<a href={this.props.biographies.mediaLink?.mediaUrl}><p>{this.props.biographies.mediaLink?.mediaTitle}</p></a>*/}


                        <Modal open={open} onClose={this.onCloseModal} center>
                            {/*<h2>Media Approved Quotes</h2>*/}
                            {/*<p><i>"{this.props.biographies.mediaApprovedQuote?.childMarkdownRemark.html}"</i></p>*/}
                            <h2>Approved quotes for {this.props.biographies.name}</h2>
                            <PublishedWork
                                dangerouslySetInnerHTML={{
                                    __html: this.props.biographies.mediaApprovedQuote?.childMarkdownRemark.html
                                }}
                            />
                        </Modal>
<br />
                    <Link  style={{boxShadow: `none`, color: `#0069B4`, textDecoration: 'none', fontWeight: 'bold'}}
                          to={`/biographies/${this.props.biographies.slug}`}>Read More about {this.props.biographies.name}</Link>
                </Container>
            )
        }
    }


    export default BiographyPreview;
