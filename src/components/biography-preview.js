import React, { Component } from 'react';
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import styles from './article-preview.module.css'
import Modal from 'react-responsive-modal';

// MODAL https://www.npmjs.com/package/react-responsive-modal

const Container = styled.div`
  a{
      text-decoration: none;
      color: hsla(0,0%,0%,0.8);
      font-size: 0.8rem
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
  ul{
  padding: 0;
    li{
      font-size: 0.8rem;
      margin: 0;
      line-height: 1rem;
      width: 100%;
     
      a{
       color: #0069b4;
      }
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

        render() {
            const { open } = this.state;

            return (
                <Container className={styles.preview}>
                    <Link to={`/${this.props.biographies.slug}`}>
                        {/*//TODO: link to the originaaagit commanl full size image*/}
                        <ProfileImage alt="" fluid={this.props.biographies.thumbnail.fluid}/>
                    </Link>
                    <BioName className={styles.previewTitle}>
                        <Link to={`/${this.props.biographies.slug}`}>{this.props.biographies.name}</Link>
                    </BioName>

                    <p
                        dangerouslySetInnerHTML={{
                            __html: this.props.biographies.description.childMarkdownRemark.html
                        }}
                    />

                    <button onClick={this.onOpenModal} style={{boxShadow: `none`, color: `#0069b4`}}>Media approved quote</button>
                    <p>Published works:</p>
                    <PublishedWork
                        className={styles.breakcontents}
                        dangerouslySetInnerHTML={{
                            __html: this.props.biographies.publishedWork?.childMarkdownRemark.html
                        }}
                    />
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2>Media Approved Quote</h2>
                            <p><i>"{this.props.biographies.mediaApprovedQuote?.internal.content}"</i></p>
                        </Modal>

                    <Link className={styles.ctaMain} style={{boxShadow: `none`, color: `#fff`}}
                          to={`/${this.props.biographies.slug}`}>Read More</Link>
                </Container>
            )
        }
    }


    export default BiographyPreview;
