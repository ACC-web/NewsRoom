import React from "react"
import { graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components'
import Img from 'gatsby-image'

const TwitterContainer = styled.div`
    .header{
        width: 100%;
        padding-bottom: 1rem;
        border-bottom: 1px solid #efefef;
        
        display: flex;
        flex-direction: row;
        
        font-size: 1.1rem;
        line-height: 1rem;
        
        h2{
          font-size:inherit;
          line-height: inherit;
          margin: 0;
        }
        
        p, a{
              margin: 0;
              text-decoration: none;
              font-size: inherit;
              line-height: inherit;

        }
        
        a {
          color: #0069B4;
        }
    }
`

const TweetItem = styled.div`
    padding: 20px                      
`

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 40px;
  height: 40px;
`

const NameHandle = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.5rem;
  margin-left: 1rem;
  
    p{
      line-height: 1rem;
      font-size: 0.7rem;
      margin: 0;
      color: #000;
    }
`

const TweetText = styled.div`
  width: 100%;
  font-size: 70%;
  line-height: 1rem;
  font-weight: 400;
  color: #000;
`

const TwitterBottom = styled.p`
  text-align: right;
  font-size: 70%;
  width: 100%;
  
  a{
    text-decoration: none;
    color: #0069B4;
  }
`


const TwitterWidget = () => (
    <>
        <StaticQuery
            query={graphql`
              query TwitterPosts {
                allTwitterStatusesUserTimelineGetPosts(limit: 3) {
                    edges {
                      node {
                        full_text
                        entities {
                          urls {
                            url
                          }
                        }
                        created_at
                        favorite_count
                        user {
                          name
                          profile_image_url
                          screen_name
                          default_profile
                        }
                      }
                    }
                  }
                }
            `}
            render={(data) => (

                <>
                    <TwitterContainer>
                        <div className="header">
                            <h2>Tweets&nbsp;</h2>
                            <p>by <a href="/">@ACC</a></p>
                        </div>
                        {
                            data.allTwitterStatusesUserTimelineGetPosts.edges.map((item, i) => (
                                <TweetItem key={i}>
                                    <UserInfo>
                                        <ProfileImage src={item.node.user.profile_image_url} />
                                        <NameHandle>
                                            <p><strong>{item.node.user.name}</strong></p>
                                            <p><Link target="_blank" to={`https://twitter.com/${item.node.user.screen_name}`}>@{item.node.user.screen_name}</Link></p>
                                        </NameHandle>
                                    </UserInfo>
                                    <TweetText>{item.node.full_text}</TweetText>
                                </TweetItem>
                            ))
                        }
                        <TwitterBottom><Link target="_blank" to="https://twitter.com/ACCGroup2">View on Twitter</Link></TwitterBottom>
                    </TwitterContainer>
                </>
            )}
        />
    </>
)

export default TwitterWidget
