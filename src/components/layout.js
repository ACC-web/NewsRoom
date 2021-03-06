import React from 'react'

// import Container from './container'
import HeaderArea from './header/header'
import '../styles/shared'
import '../styles/style.css'
import Footer from './footer/footer'
import styled from 'styled-components'

const Container = styled.div`
  margin:0 auto;
  font-family: montserrat, arial, sans-serif;
  padding: 0;
  //background-color: #fff;
  margin: 0 auto;
  
  @media(min-width: 768px){
      margin-top: 30vh;
  }
`

const GoogleFont = styled.span`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,200i,300i,400,400i,500,600, 600i&display=swap');
`
// import "./base.css"

class Template extends React.Component {
  render () {
    const { children } = this.props

    return (
        <div>
        <HeaderArea />
        <Container>
            <GoogleFont />
            {/*<Navigation />*/}
            {/*//TODO: breadcrumbs*/}
            {children}
        </Container>
        <Footer />
        </div>
    )
  }
}

export default Template

