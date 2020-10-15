/* Pagination Component 
-------------------------------------------------*/
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Container, Row, Col } from "reactstrap";

const List = styled.ul`
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
`;
const ListItem = styled.li`
  display: inline;
  a {
    position: relative;
    float: left;
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #ddd;
    marginleft: -1px;
    textdecoration: none;
  }
`;

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
};

const defaultProps = {
  initialPage: 1
};

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    if (pageOfItems.length == 0) {
      pager.totalPages = 1;
    }
    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 12
    pageSize = this.props.pageSize || 12;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= pageSize) {
      // less than 12 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 12 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = pageSize;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <List>
        {/* <ListItem className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a style={{
                       
                        color: pager.currentPage === 1 ? '#777777' : '#337ab7',
                        cursor: pager.currentPage === 1 ? 'not-allowed' : ''
                    }} onClick={() => this.setPage(1)}>First</a>
                </ListItem> */}
        <ListItem className={pager.currentPage === 1 ? "disabled" : ""}>
          <a
            style={{
              color: pager.currentPage === 1 ? "#777777" : "#337ab7",

              cursor: pager.currentPage === 1 ? "not-allowed" : ""
            }}
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            <FaAngleLeft />
          </a>
        </ListItem>
        {/* {pager.pages.map((page, index) =>
                    <ListItem style={{ display: 'inline' }} key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a style={{
                           
                            color: pager.currentPage === page ? '#fff' : '#337ab7',
                            background: pager.currentPage === page ? '#337ab7' : '#fff',
                          
                        }} onClick={() => this.setPage(page)}>{page}</a>
                    </ListItem>
                )} */}
        <ListItem className={pager.currentPage === pager.totalPages ? "disabled" : ""}>
          <a
            style={{
              color: pager.currentPage === pager.totalPages ? "#777777" : "#337ab7",
              cursor: pager.currentPage === pager.totalPages ? "not-allowed" : ""
            }}
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            <FaAngleRight />
          </a>
        </ListItem>

        {/* <ListItem className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a style={{
                       
                        color: pager.currentPage === pager.totalPages ? '#777777' : '#337ab7',
                       
                        cursor: pager.currentPage === pager.totalPages ? 'not-allowed' : ''
                    }} onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </ListItem> */}
      </List>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
