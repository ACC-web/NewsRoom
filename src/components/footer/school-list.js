import React from "react";
// import styled from '@emotion/styled';
import {List} from '../../styles/shared.ts';
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0;
  
    @media (min-width: 768px){
      width: auto;
    }
`

class SchoolList extends React.Component {

  render() {
    return (
      <Wrapper>
        <h2>Schools</h2>
        <List>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/moreton/index.html">Moreton, QLD</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/singleton/index.html">Singleton, NSW</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/marsdenpark/index.html">Marsden Park, NSW</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/hume/index.html">Hume, VIC</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/darlingdowns/index.html">Darling Downs, WA</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/southlands/index.html">Southlands, WA</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/burnie/index.html">Burnie, TAS</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/launceston/index.html">Launceston, TAS</a></li>
          <li><a target="_blank" rel="noopener noreferrer"  href="https://www.acc.edu.au/hobart/index.html">Hobart, TAS</a></li>
        </List>
      </Wrapper>
    );
  }

}

export default SchoolList;
