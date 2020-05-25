import { css } from 'styled-components';
import styled from 'styled-components';
import { colors } from './colors';
import Img from 'gatsby-image'

export const GlobalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,200i,300i,400,400i,500,600, 600i&display=swap');
`

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

export const H2 = styled.h2`
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    margin-top: 0;
`

export const SectionHeadline = styled.h1`
    padding: 0 0 0.4rem 0;
    margin: 0 0 2rem 0;
    border-bottom: 1px solid #ddd;
    
`

export const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  flex-wrap: wrap;
 
  @media(min-width: 768px){
    flex-direction: row;
  }
  
  li{
    margin: 0 1rem;
    padding: 0;
    list-style: none;
    width: calc(100% - 2rem);
    
    @media(min-width: 768px){
      width: 33.33333%;
      margin: 0;
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
  margin: 1rem 0;
  
`

export const FeatureImage = styled(Img)`
    width: calc(100% - 2rem);
    margin: 0 1rem; 
    height: 30rem;
    float: none;
    background-color: #fff;

   @media(min-width: 768px){
        width: 50%;
        float: right;
        margin: 0 1rem 1rem 1rem;
  }
`


/*====================================== Gallery pages ==================================*/
/* multimedia gallery and Infographic gallery */
export const Item = styled.li`
    width: 100%;
    margin: 0.5rem 0;
    position:relative;
  @media(min-width:576px){
    width: calc(50% - 1rem);
    margin: 0.5rem;
    //max-height: 9rem;
    position:relative;
  }
  @media(min-width:768px){
    width: calc(33.3333% - 1rem);
    margin: 0.5rem;
  }

  & a{
    text-decoration: none;
    color: #2a333c;

    &:before{
        content:"";
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADUElEQVRIDbWWzUtVQRiHu9EHJoSUJUjSwoKSTKmNFYG5adGitkULq5WtCoz+g7ZRmzDaRBkRlFSrWtii0EW5CBdFZBSp2YeppWVG3p7nej23c+8516PSwHNnzvv+Zt47c2beOaklCUo6na5CdggaYQdUwCisgE/wBG6mUqlO6sUVgm2FThiH3zAMP+APDMBPGAN9E/ACWhcclc4XYRQM0guXoAE2wFIHpi6DzdAC3TAEBn8PtfMKTodX8A364WjSzmjLoQNcBVelOVFfhM/BJbuTqEOEiL51MJUdpylCkjMhcoYGbMtZC1v4N8G1Qk/Ogr8EBuErRAfG4Tt0SeecIZrHWe2uXJjCFppqcBJ9sC6kwOAuddP0hxwxD+iegRumIUYSmNGcAnf/3cBoA8MjcJcm2jToEgfNju+m+gx1mcA0qsB/0psxJPhBO9+gh+njyrQ7vOfNTLMSzCr/qzxkYGMdMICNRhiDq/BfCulxmIG7wAxWb9CdsAoSbSJ0Cy1OrBSqDLoeXN5BWHRhJqmYQV5jL4FKg3pbDLEE09ShwgAX4HzIWOQBbQ3uHurlEbIBbMvEoF5PaxCWUeeXjRiO4QufsXwVz2j2UbkZTQKuXH7ZjmECRgzqfTgF4YyBgdm7s9/Afga9Th1Z8G3DcRucQAP9xiOE3sFpGPQfXgZ3VUuEMGPC9w4m4ZwG6uCc0q4AE4sJYObwRwyEz3P6C0odoAns1B2hDUz4zShf4CzMBt1N2wvdnH0wEOc18O2F79ATuHh4CR+hPDBGNPD7b7013mbb/tkROBEhD0z428CVOv6vsRWDA3YExpgGGoufJ9PgDXImRpox468BLxNPSbhg9BPDL4XY92IP/KvBJTVoJpeGRwo/obkP5vYjYc/MYLU43Aze+B7i2ILfwJlNFSvCgeYW+L4fxOpwNoNL5o1fHStM4KC/AR3HI1e8IHI3u1kMfrq4utBLH9/hPXCGcwecHQKxgfvAzeWSex+unfVH1fg9Fu5SN43vMHZJ45Kz78MMdQX2gO/Y7NUF3hYmb3PpFvDr3xRo7jbnTsJJstIN6oUVgvs52Q7O4AO4bLPFTOahN9P0QO4cFgkXO9OoPgxaj92ZVYI3xggMwlNmZjJPVP4CnxREQ4pBE9MAAAAASUVORK5CYII=)
        no-repeat
        center center;
        position: absolute;
        display: block;
        top: calc(50% - 37px);
        right: calc(50% - 37px);
        z-index: 999;
        //color: #fff;
        border: 0;
        //background: transparent;
        box-sizing: border-box;
        width: 74px;
        height: 74px;

        //border-color: transparent transparent transparent #0069B4;
        transition: 150ms all ease;
        cursor: pointer;
        }
        &:hover{
          &:before {
            content:"";
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAHaADAAQAAAABAAAAHQAAAAD9szRrAAADUElEQVRIDbWWzUtVQRiHu9EHJoSUJUjSwoKSTKmNFYG5adGitkULq5WtCoz+g7ZRmzDaRBkRlFSrWtii0EW5CBdFZBSp2YeppWVG3p7nej23c+8516PSwHNnzvv+Zt47c2beOaklCUo6na5CdggaYQdUwCisgE/wBG6mUqlO6sUVgm2FThiH3zAMP+APDMBPGAN9E/ACWhcclc4XYRQM0guXoAE2wFIHpi6DzdAC3TAEBn8PtfMKTodX8A364WjSzmjLoQNcBVelOVFfhM/BJbuTqEOEiL51MJUdpylCkjMhcoYGbMtZC1v4N8G1Qk/Ogr8EBuErRAfG4Tt0SeecIZrHWe2uXJjCFppqcBJ9sC6kwOAuddP0hxwxD+iegRumIUYSmNGcAnf/3cBoA8MjcJcm2jToEgfNju+m+gx1mcA0qsB/0psxJPhBO9+gh+njyrQ7vOfNTLMSzCr/qzxkYGMdMICNRhiDq/BfCulxmIG7wAxWb9CdsAoSbSJ0Cy1OrBSqDLoeXN5BWHRhJqmYQV5jL4FKg3pbDLEE09ShwgAX4HzIWOQBbQ3uHurlEbIBbMvEoF5PaxCWUeeXjRiO4QufsXwVz2j2UbkZTQKuXH7ZjmECRgzqfTgF4YyBgdm7s9/Afga9Th1Z8G3DcRucQAP9xiOE3sFpGPQfXgZ3VUuEMGPC9w4m4ZwG6uCc0q4AE4sJYObwRwyEz3P6C0odoAns1B2hDUz4zShf4CzMBt1N2wvdnH0wEOc18O2F79ATuHh4CR+hPDBGNPD7b7013mbb/tkROBEhD0z428CVOv6vsRWDA3YExpgGGoufJ9PgDXImRpox468BLxNPSbhg9BPDL4XY92IP/KvBJTVoJpeGRwo/obkP5vYjYc/MYLU43Aze+B7i2ILfwJlNFSvCgeYW+L4fxOpwNoNL5o1fHStM4KC/AR3HI1e8IHI3u1kMfrq4utBLH9/hPXCGcwecHQKxgfvAzeWSex+unfVH1fg9Fu5SN43vMHZJ45Kz78MMdQX2gO/Y7NUF3hYmb3PpFvDr3xRo7jbnTsJJstIN6oUVgvs52Q7O4AO4bLPFTOahN9P0QO4cFgkXO9OoPgxaj92ZVYI3xggMwlNmZjJPVP4CnxREQ4pBE9MAAAAASUVORK5CYII=)
            no-repeat
            center center;
            position: absolute;
            display: block;
            top: calc(50% - 22px);
            right: calc(50% - 37px);
            z-index: 999;
            //color: #fff;
            border: 0;
            //background: transparent;
            box-sizing: border-box;
            width: 80px;
            height: 80px;
            opacity: 0.1;

            //border-color: transparent transparent transparent #0069B4;
            transition: 150ms all ease;
            cursor: pointer;
           }
      }
  }
    p{
        margin: 0.2rem 0;
        font-size: 80%;
  }
  `

