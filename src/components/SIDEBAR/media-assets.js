import React from 'react'
import { Link } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'


const Container = styled.section`
 display: flex;
 flex-direction: column;
 
   width: calc(100% - 2rem);

 
  background-color: #E9ECEF;
  padding: 1rem;
  @media(min-width: 768px){
    margin: 2rem 0 1rem 0;
  }
  
  h2{
    font-size: 1.1rem;
    font-weight: 800;
  }
`

const Button = styled(Link)`
  background-color: #0069B4;
  padding: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
    transition: 0.4s;

  
  &:hover{
      background-color: #E9ECEF;
      color: #0069B4;
    transition: 0.4s;

  }
`


export default () => (
    <Container>
        <h2>Approved media assets</h2>
        <Button to={"/multimedia"}>Multimedia Gallery</Button>
        <Button to={"/fact-sheets"}>Fact Sheet</Button>
        <Button to={"/infographics"}>Infographics</Button>
        <Button to={"/biographies"}>Biographies</Button>
        <Button to={"/story-starters"}>Story Starters</Button>
    </Container>
)
