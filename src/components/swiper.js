// https://swiperjs.com/react/
import React from "react"
import { graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components'
import Img from 'gatsby-image'
import get from "../index";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

const SwiperComponent = () => (
    <>
        <StaticQuery
            query={graphql`
              query SwiperPosts {
                allFile(filter: {dir: {regex: "\\\\/grayscale/"}}) {
                    edges {
                      node {
                        id
                        childImageSharp {
                          fixed {
                            src
                          }
                        }
                      }
                    }
                  }
                }
            `}
            render={(data) => (

                <>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            data.allFile.edges.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Img src={item.node.childImageSharp.src} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            )}
        />
    </>
)

export default SwiperComponent
