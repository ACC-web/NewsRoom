import React from 'react'

import Container from './container'
import HeaderArea from './header/header'
import '../styles/shared'
import '../styles/style.css'
import Footer from './footer/footer'

// import "./base.css"

class Template extends React.Component {
  render () {
    const { children } = this.props

    return (
        <div>
            <HeaderArea />
        <Container>
            <googleFonts />
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
