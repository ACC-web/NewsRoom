import React from "react";
// import styled from "@emotion/styled";
import { colors } from '../../styles/colors.ts';

import { List } from '../../styles/shared.ts';


class EGuides extends React.Component {

  render() {
    return (
      <div>
        <h2>eGuides</h2>
        <List>
          <li><a target="_blank" href="#">'Big School Ready' Checklist'</a></li>
          <li><a target="_blank" href="#">How to Read to Your Child</a></li>
          <li><a target="_blank" href="#">Meal Prepping School Lunches</a></li>
          <li><a target="_blank" href="#">The Ultimate Nack-to-School Checklist</a></li>
          <li><a target="_blank" href="#">Helping Your Child Adjust to High School</a></li>
          <li><a target="_blank" href="#">The Definitive Guide to Online School</a></li>
        </List>
      </div>
    );
  }
}


export default EGuides;
