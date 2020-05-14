import React from 'react';
import SiteNavLogo from "./SiteNavLogo";
import SiteNav from "./SiteNav";
import '../../styles/style.css';
import styled from "styled-components";

import {
    SiteHeader,
    headerOuter,
    outer,
} from '../../styles/shared.ts';

const LogoWrapper = styled.div`
    height: 73px;
    width: 70%;
    max-width: 255px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

class HeaderArea extends React.Component {
    render () {
        return (
            <>
                <header css={[outer, SiteHeader]}>
                    <div css={headerOuter}>
                        <LogoWrapper>
                            <a href="https://www.acc.edu.au/index.html">
                                <SiteNavLogo />
                            </a>
                        </LogoWrapper>
                        <SiteNav />
                    </div>
                </header>
            </>
        )
    }
}

export default HeaderArea;
