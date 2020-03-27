import { css } from 'styled-components';
import styled from 'styled-components';
import { colors } from './colors.ts';

export const outer = css`
  position: relative;
  padding: 0 4vw;
`;

export const headerOuter = css`
  position: relative;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

// Centered content container blocks
export const inner = css`
  //add next line because weird style bug, first line will be ignored
  color: #fff;
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;


export const SiteMain = css`
  z-index: 100;
  flex-grow: 1;
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0;
  padding: 0;
  font-size: 3.8rem;
  font-weight: 700;
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

export const PostFeedRaise = css`
  @media (min-width: 900px) {
    margin-top: 2rem;
    padding-top: 0;
  }
`;

export const SocialLink = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  color: #fff;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SiteHeader = css`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  /* background: color(var(--darkblue) l(-5%)) no-repeat center center; */
  background: rgb(42, 51, 60) no-repeat center center;
  background-size: cover;
  
  a{z-index:9999}
  
`;

export const SiteHeaderStyles = css`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  z-index: 10;
  display: block;
  height: 80px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }

  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 80px;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  }
  @media (max-width: 700px) {
    padding-right: 0;
    padding-left: 0;
  }
`

/* --------- Article content list pages ---------*/

export const SectionHeadline = styled.h2`
    padding: 0 0 0.4em 0;
    margin: 0 0 5vmin 0;
    border-bottom: 1px solid #ddd;
`

export const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
 
  @media(min-width: 768px){
    flex-direction: row;
  }
  
  li{
    margin: 0 1rem;
    padding: 0;
    list-style: none;
    width: calc(100% - 2rem);
    
    @media(min-width: 768px){
      width: calc(33.33333% - 2rem);
      margin: 0 1rem;
    }
  }
`


// -------------Author content about the autor sits under the main header -----------
export const AuthorHeader = css`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  /* background: color(var(--darkblue) l(-5%)) no-repeat center center; */
  background: rgb(42, 51, 60) no-repeat center center;
  background-size: cover;
`

export const AuthorHeaderContent = styled.div`
  display: column;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
    
  // padding: 2rem 0vw 4rem; //custom
  // min-height: 200px; //custom
  text-align: center;
  margin-top:3rem;
  
  @media (min-width: 768px){
    display: flex;
  }
  
`

export const AuthorHeaderStyles = css`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  z-index: 10;
  display: block;
  height: 80px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }

  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 80px;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  }
  @media (max-width: 700px) {
    padding-right: 0;
    padding-left: 0;
  }
`

export const AuthorProfileImage = css`
  display: block;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: rgb(42, 51, 60);
  border-radius: 100%;
  object-fit: cover;
  margin-top: 1rem;
  margin-right: 15px;
  width: 60px;
  height: 60px;
`

export const AuthorLeft = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
      width: 100%;
      margin-bottom: 2rem;

    @media (min-width: 768px){
        width: 20%;
        margin-bottom: 0;
    }
   
   a, a h1{
    color: rgb(59, 71, 77);
    }
`

export const AuthorRight = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    padding-left: 2rem;
    text-align: left; 
    
     @media (min-width: 768px){
        width: 75%;
    }
`

export const List = styled.ul`
    list-style-type: none;
    padding: 0;
      color: ${colors.lightgrey};

    
    li{    
      padding: 0;
      a{
          font-size: inherit;
          margin: 0;
          color: inherit;
          
          :hover{
              color: ${colors.lightblue};
          }
      }
    }
   
`

export const ItalicParagraph = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  margin: 0;
  
`
