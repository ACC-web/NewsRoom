import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Container = styled.section`
 display: flex;
 flex-direction: row;
 
  //background-color: #E9ECEF;
  //padding: 1rem;
  margin-bottom: 1rem;

`

const Photo = styled(Img)`
  width: 100px;
  height: auto;
  margin-right: 1rem;
  
  @media(min-width:768px){
    width: 60px;
    height: auto;
  }
  
  @media(min-width:998px){
    width: 80px;
    height: auto;
  }
  @media(min-width:1200px){
    width: 100px;
    height: auto;
  }
`

// const Photo = styled(Img)``
const TextElements = styled.div`
  display: flex;
  flex-direction: column;
  
  
  p{
    font-size: 70%;
    margin: 0;
    line-height: 1.2rem;
    
   
  /*These are technically the same, but use both */
        overflow-wrap: break-word;
        word-wrap: break-word;

        -ms-word-break: break-all;
        /* This is the dangerous one in WebKit, as it breaks things wherever */
        word-break: break-all;
        /* Instead use this non-standard one: */
        word-break: break-word;

        /* Adds a hyphen where the word breaks, if supported (No Blink) */
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
 
  strong{
      font-size: 90%;
    }
`

export default ({ contact }) => (
    <Container>

        <Photo fluid={contact.image.fluid} objectFit="cover" alt="Media Contact's photo" objectPosition="50% 50%" />

        <TextElements>
            <p><strong>{contact.name}</strong></p>
            <p>{contact.position}</p>
            <p>{contact.companyName}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
        </TextElements>
    </Container>
)
