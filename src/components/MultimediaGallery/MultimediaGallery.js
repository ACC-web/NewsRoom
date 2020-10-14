import React, { Component } from 'react';
import styled from 'styled-components'
import Gallery from '../MultimediaGallery/Gallery';
import _ from 'lodash';
import Lightbox from '../MultimediaGallery/Lightbox/Lightbox';
import Pagination from '../MultimediaGallery/Pagination'
import "../MultimediaGallery/multimedia.css";
import searchIcon from "../../images/search.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaImages, FaVideo, FaImage, FaUniversity } from 'react-icons/fa';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';

const Container = styled.div`
  width:  100% ;
`
const CheckBoxContainer = styled.div`
width:  100%  !important;
`;
const searchstyles = {
  searchicon: {
    backgroundImage: `url(${searchIcon})`
  }
};


class MultimediaGallery extends Component {
  constructor(props) {
    super();
    this.state = {
      tabIndex: 0, categories: props.cats, selectedOption: null, options: [],
      allDataItems: [], gallerylogos: [], galleryImages: [], galleryinfographic: [], galleryvideos: [], filterCategories: [], filteredOptions: [], searchValue: '',
      pageOfItems: [],
      isLoading: false, isLightBoxLoading: false,
      page: 0, items: null, photos: null, logos: null, infographic: null, videos: null, itemsLightbox: {
        type: 'images',
        items: []
      }, pageNum: 1, totalPages: 1, loadedAll: false, currentItem: 0
    };
  }
  onhandlecheckboxChange = (e, item) => {
    var filterCategories = this.state.filterCategories;
    var data = item.toLowerCase().trim();
    const index = filterCategories.indexOf(data);
    if (e.target.checked) {
      if (index == -1) { filterCategories.push(data) }
    }
    else {
      if (index > -1) {
        filterCategories.splice(index, 1);
      }
    }
    this.setState({ filterCategories: filterCategories }, () => {
      this.filterImageGallary();
    });
  }
  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    var filteredOptions = [];
    if (selectedOption != null) {
      Object.keys(selectedOption).forEach(key => {
        var data = selectedOption[key].value.toLowerCase().trim();
        const index = filteredOptions.indexOf(data);
        if (index == -1) { filteredOptions.push(data) }
      });

    }
    this.setState({ filteredOptions: filteredOptions }, () => {
      this.filterImageGallary();
    });
  };
  filterImageGallary() {
    //filteredOptions
    var filter = this.state.galleryImages.filter(x =>
      (
        x.categories.map(v => v.toLowerCase().trim()).indexOf(this.state.searchValue) > -1) ||
      (x.categories.map(v => v.toLowerCase().trim()).some(r => this.state.filterCategories.map(v => v.toLowerCase().trim()).indexOf(r) >= 0)) ||
      (x.categories.map(v => v.toLowerCase().trim()).some(r => this.state.filteredOptions.map(v => v.toLowerCase().trim()).indexOf(r) >= 0))
    );
    if (this.state.searchValue != '' || this.state.filterCategories.length > 0 || this.state.filteredOptions.length > 0) {
      this.setState({ allDataItems: filter });
    } else {
      this.setState({ allDataItems: this.state.galleryImages });
    }
  }
  onSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value.toLowerCase().trim()
    }, () => {
      this.filterImageGallary();
    });
  }
  onChangePage = (pageOfItems) => {
    this.activeLoader();
    this.setState({ pageOfItems: pageOfItems, photos: pageOfItems });
  }
  componentDidMount() {
    // an example array of items to be paged
    const props = this.props;
    const filtercategoriesOptions = this.props.filtercategories.filter(x =>
      this.props.cats.map(v => v.toLowerCase().trim()).indexOf(x.node.category.toLowerCase().trim()) == -1
    ).map((item) => {
      return {
        value: item.node.category,
        label: item.node.category
      }
    });
    let allDataItems = props.galleryImages.map((item) => {
      let categories = item.node.categories.map((cat) => { return cat.category });
      return {
        src: item.node.asset.fluid.src,
        width: 100,
        height: 100,
        caption: item.node.caption,
        alt: item.node.caption,
        type: 'photo',
        srcset: item.node.asset.fluid.srcSet.split(),
        sizes: item.node.asset.fluid.sizes.split(),
        categories: categories
      };
    });

    let galleryinfographic = props.infographic.map((item) => {
      return {
        src: item.node.infographicImage.fluid.src,
        width: 100,
        height: 100,
        alt: item.node.caption,
        caption: item.node.caption,
        type: 'infographic',
        srcset: item.node.infographicImage.fluid.srcSet.split(),
        sizes: item.node.infographicImage.fluid.sizes.split(),
      };
    });
    let gallerylogos = props.logos.map((item) => {
      return {
        src: item.node.childImageSharp.fixed.src,
        width: 100,
        height: 100,
        alt: '',
        caption: '',
        type: 'logos',
        srcset: [],
        sizes: [],
      };
    });
    gallerylogos.push(gallerylogos[0])

    gallerylogos.push(gallerylogos[1])
    gallerylogos.push(gallerylogos[0])

    gallerylogos.push(gallerylogos[1])
    let galleryvideos = props.galleryvideos.map((item) => {
      return {
        description: item.node.description,
        src: item.node.vimeoThumbnail.fluid.src.url,
        width: 100,
        height: 100,
        type: "video",
        content: item.node.vimeoUrl,
        srcset: item.node.vimeoThumbnail.fluid.srcSet.split(),
        sizes: item.node.vimeoThumbnail.fluid.sizes.split(),
      }
    });
    galleryvideos.push(galleryvideos[0])

    galleryvideos.push(galleryvideos[1])
    galleryvideos.push(galleryvideos[0])

    galleryvideos.push(galleryvideos[1])
    galleryvideos.push(galleryvideos[0])

    galleryvideos.push(galleryvideos[1])
    this.setState({
      options: filtercategoriesOptions,
      allDataItems: allDataItems, gallerylogos: gallerylogos, galleryImages: allDataItems, galleryinfographic: galleryinfographic, galleryvideos: galleryvideos, filterCategories: [], filteredOptions: [], searchValue: '',

    });
    this.activeLoader();
    this.loadMorePhotos();
  }

  loadMorePhotos = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (this.state.pageNum > this.state.totalPages) {
      this.setState({ loadedAll: true });
      return;
    }
    if (this.state.page == undefined) {
      this.setState({ page: 0 });
    }

    let photos = this.state.pageOfItems;
    if (this.state.page == undefined) { this.setState({ page: 0 }) }

    let items = photos;
    this.setState({
      page: this.state.page + 1,
      photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      items: this.state.items ? this.state.items.concat(items) : items,
      pageNum: this.state.pageNum + 1,
      totalPages: photos.length
    });
  }
  openLightbox = (index, event, typeItem) => {
    event.preventDefault();

    this.setState({
      itemsLightbox: {
        type: (typeItem == 'photos') ? 'images' : (typeItem == 'infographic') ? 'infographic' : (typeItem == 'logos') ? 'logos' : 'videos',
        items: (typeItem == 'photos' || typeItem == 'infographic' || typeItem == 'logos') ? this.state[typeItem] : this.state[typeItem].map(item => item.content)
      },
      currentItem: index,
      lightboxIsOpen: true
    });
    this.activeLightBoxLoader();
  }
  closeLightbox = () => {
    this.setState({
      currentItem: 0,
      lightboxIsOpen: false,
    });
  }
  activeLightBoxLoader() {
    this.setState({ isLightBoxLoading: true });
    setTimeout(() => {
      this.setState({ isLightBoxLoading: false });
    }, 2000);
  }
  gotoPrevious = () => {
    this.setState({
      currentItem: this.state.currentItem - 1,
    });
    this.activeLightBoxLoader();
  }
  gotoNext = () => {
    if (this.state.photos.length - 2 === this.state.currentItem) {
      this.loadMorePhotos();
    }
    this.setState({
      currentItem: this.state.currentItem + 1,
    });
    this.activeLightBoxLoader();
  }
  onSelectTab(tabIndex) {
    this.setState({ tabIndex })
    //for type video
    if (tabIndex == 1) {
      const videos = this.state.galleryvideos;
      this.setState({ allDataItems: videos, videos: videos });
    } //for type images
    else if (tabIndex == 0) {
      this.setState({ allDataItems: this.state.galleryImages });
      this.filterImageGallary();
    }
    //
    else if (tabIndex == 2) {
      const logos = this.state.gallerylogos;
      this.setState({ allDataItems: logos, logos: logos });
      //  gallerylogos
    }
    else if (tabIndex == 3) {
      const infographic = this.state.galleryinfographic;
      this.setState({ allDataItems: infographic, infographic: infographic });
      //  galleryinfographic
    }
  }

  activeLoader = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      var bodyRect = document.body.getBoundingClientRect(),
        elemRect = document.getElementById('MultimediaGallery').getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
      window.scrollTo(0, offset - 10)
    }, 10);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  renderGallery() {
    let cols = this.state.tabIndex == 0 ? 3 : 4;
    //  if(window.innerWidth<768)
    //  {
    //   cols=2;
    //  }
    return (

      <Gallery items={this.state.pageOfItems} isLoading={this.state.isLoading} cols={cols} onClickItem={this.openLightbox} />
    );
  }
  render() {
    if (this.state.items) {
      const self = this;
      const { selectedOption } = this.state;
      return (<Container >

        <h2 className="media-gallery-title"> Multimedia  Gallery</h2>
        <div className={`media-gallery-wrapper ${this.state.tabIndex != 0 ? 'fullgallery' : ''} ${this.state.tabIndex == 3 ? 'infogallery' : ''}`}>
          <div className="row">

            <div className="visit-form-wrapper"><Container>
              <div className="visit-form">
                <form className={this.state.tabIndex != 0 ? 'hidden' : ''}>
                  <Select isMulti className="basic-multi-select" isClearable={false}
                    classNamePrefix="select" options={this.state.options} value={selectedOption}
                    onChange={this.handleSelectChange} />
                  <div className="form-group search-form hidden">
                    <input type="text" placeholder="Search" onChange={this.onSearchChange} name="Name of outlet" className="form-control" id="Outlet"
                      required="required" style={searchstyles.searchicon} />
                  </div>
                  <div >
                    {this.state.categories.map(function (item, index) {
                      return (
                        <div className="checkbox-wrapper" key={index}>
                          <div className="checkboxes"  >
                            <div className="flex-row">
                              <CheckBoxContainer className="form-group" >
                                <input className="checkbox" type="checkbox" defaultChecked={false} onClick={(e) => self.onhandlecheckboxChange(e, item)} />
                                <label htmlFor="addToMedia">{item}</label>
                              </CheckBoxContainer>
                            </div>
                          </div>
                        </div>)
                    })}
                  </div>
                </form>
              </div>


            </Container></div>
            <div className="photo-gallery-wrapper" id="MultimediaGallery">
              <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelectTab(tabIndex)}>
                <TabList>
                  <Tab><div><span className="tab-text">Images</span><span><FaImages /></span></div></Tab>
                  <Tab><div><span className="tab-text">Videos</span><span><FaVideo /></span></div></Tab>
                  <Tab><div><span className="tab-text">Logos</span><span><FaImage /></span></div></Tab>
                  <Tab><div><span className="tab-text">Infographics</span><span>< FaUniversity /></span></div></Tab>
                </TabList>
                <TabPanel>{this.renderGallery()}</TabPanel>
                <TabPanel>{this.renderGallery()}</TabPanel>
                <TabPanel>{this.renderGallery()}</TabPanel>
                <TabPanel>{this.renderGallery()}</TabPanel>
              </Tabs>
              <div className={` ${this.state.allDataItems.length == 0 && this.state.tabIndex == 0 ? '' : 'hidden'}`} >Sorry there are no photos that match that category</div>
              <div className={`pagination-wrapper ${this.state.allDataItems.length == 0 ? 'hidden' : ''}`} >
                <div className="pagination">
                  <div className="container">
                    <div className="text-center">
                      <Pagination pageSize={this.state.tabIndex != 0 ? 16 : 12} items={this.state.allDataItems} onChangePage={this.onChangePage} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <Lightbox
            theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
            items={this.state.itemsLightbox}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentItem={this.state.currentItem}
            isOpen={this.state.lightboxIsOpen}
            width={1600} isLightBoxLoading={this.state.isLightBoxLoading}
          />


        </div>

      </Container>);
    }
    else {
      return (
        <div className="">
          <div className={` ${this.state.allDataItems.length == 0 && this.state.tabIndex == 0 ? '' : 'hidden'}`} >Sorry there are no photos that match that category</div>
        </div>
      );
    }
  }

}

export default MultimediaGallery;
