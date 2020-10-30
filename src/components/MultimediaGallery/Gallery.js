import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { FaPlay } from "react-icons/fa";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from "styled-components";
// Gallery image style

const Container = styled.div`
  display: block;
  float: left;
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;
const Image = styled.img`
  display: block;
  border: 1px solid #f3f3f6;
`;

const Caption = styled.p`
  font-size: 50%;
  margin-top: 5px;
  @media(min-width: 768px){
      font-size: 60%;

  }
`
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      loaded: false,
      isLoading: this.props.isLoading
    };
  }
  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    window.addEventListener("resize", this.handleResize);
  }

  static getDerivedStateFromProps(props, state) {
    return { isLoading: props.isLoading };
  }

  componentDidUpdate() {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }

  handleResize = e => {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
  };

  render() {
    const { cols, margin, items, onClickItem } = this.props;

    const containerWidth = this.state.containerWidth;
    let col = this.props.cols;
    if (window.innerWidth < 768) {
      col = 2;
    }
    const remainder = items.length % col;

    //   if (!Object.getOwnPropertyDescriptor(style, 'margin')
    //     || _.get(Object.getOwnPropertyDescriptor(style, 'margin'), 'writable'))
    //     _.set(style, 'margin', margin);

    // calculate the available space for the images by subtracting the margin space from the actual parent container width
    // the 2 is for each side of the image
    const containerSpace = Math.floor(containerWidth - col * (margin * 2));
    let itemNode = [];
    let lastRowWidth;
    let lastRowIndex;
    let photoIndex = 0;
    let videoIndex = 0;
    let infographicIndex = 0;
    let logosIndex = 0;

    function getItemIndex(type) {
      switch (type) {
        case "photo":
          return photoIndex++;
          break;
        case "video":
          return videoIndex++;
          break;
        case "infographic":
          return infographicIndex++;
          break;
        case "logos":
          return logosIndex++;
          break;

        default:
          break;
      }
    }

    if (remainder) {
      // there are fewer photos than cols num in last row
      lastRowWidth = Math.floor((containerWidth / col) * remainder - remainder * (margin * 2));
      lastRowIndex = items.length - remainder;
    }

    // loop thru each set of cols num
    // eg. if cols is 3 it will loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set

    for (let i = 0; i < items.length; i += col) {
      let totalAspectRatio = 0;
      let commonHeight = 0;

      // get the total aspect ratio of the row
      for (let j = i; j < i + col; j++) {
        if (!items[j]) {
          break;
        }
        const { width, height } = items[j].type == "photo" || items[j].type == "video" ? items[j] : { width: 100, height: 100 };

        if (j == items.length) {
          break;
        }
        items[j].aspectRatio = width / height;
        totalAspectRatio += items[j].aspectRatio;
      }
      if (i === lastRowIndex) {
        commonHeight = lastRowWidth / totalAspectRatio;
      } else {
        commonHeight = containerSpace / totalAspectRatio;
      }
      // run thru the same set of items again to give the width and common height
      for (let k = i; k < i + col; k++) {
        if (k == items.length) {
          break;
        }

        items[k] = items[k] || {};

        // explicity set the exact width of the image instead of letting the browser calculate it based on the height of the image
        // because the browser may round up or down and cause the image to break to the next row if its even 1 pixel off
        const width = commonHeight * items[k].aspectRatio;
        if (window.innerWidth < 768) {
          if (items[k].type == "infographic") {
            itemNode.push(this.renderItem(items[k], k, onClickItem, commonHeight - 6.5, width - 6.5, getItemIndex(items[k].type)));
          } else {
            itemNode.push(this.renderItem(items[k], k, onClickItem, commonHeight - 6, width - 6, getItemIndex(items[k].type)));
          }
        } else {
          if (items[k].type == "infographic") {
            itemNode.push(this.renderItem(items[k], k, onClickItem, commonHeight - 10.5, width - 10.5, getItemIndex(items[k].type)));
          } else {
            itemNode.push(this.renderItem(items[k], k, onClickItem, commonHeight - 9, width - 9, getItemIndex(items[k].type)));
          }
        }
      }
    }

    return this.renderGallery(itemNode);
  }
  renderItem(item, k, onClickItem, commonHeight, width, itemIndex) {
    const filename=item.filename;
    const originalimg=item.originalimg;
    if (item.type == "photo") {
      const src = item.src;
      const alt = item.alt;

      let srcset;
      let sizes;

      if (item.srcset) {
        srcset = item.srcset.join();
      }
      if (item.sizes) {
        sizes = item.sizes.join();
      }

      return (
        <div className="image-item-wrapper" key={k}>
          <Container data-type="photo" className="photo-item">
            <a href="#" className={k} onClick={e => onClickItem(itemIndex, e, "photos")} style={{ textDecoration: 'none' }}>
              <Image src={src} originalimg={originalimg}  filename={filename} srcSet={srcset} sizes={sizes} height={commonHeight} width={width} alt={alt} />
                <Caption>{item.caption}</Caption>
            </a>
          </Container>
        </div>
      );
    } else if (item.type == "video") {
      const src = item.src;
      let sizes;
      let srcset;

      if (item.srcset) {
        srcset = item.srcset.join();
      }
      if (item.sizes) {
        sizes = item.sizes.join();
      }
      return (
        <div className="video-item-wrapper" key={k}>
          <Container className="video-item-container" data-type="video">
            <a href="#" className={k} onClick={e => onClickItem(itemIndex, e, "videos")}>
              <Image src={src} originalimg={originalimg} filename={filename} srcSet={srcset} sizes={sizes} height={commonHeight} width={width} />
              <i className="material-icons">
                <FaPlay />
              </i>
            </a>
            <div style={{ width: width + "px" }}>{item.description}</div>
          </Container>
        </div>
      );
    } else if (item.type == "infographic") {
      const src = item.src;
      const alt = item.alt;

      let srcset;
      let sizes;

      if (item.srcset) {
        srcset = item.srcset.join();
      }
      if (item.sizes) {
        sizes = item.sizes.join();
      }

      return (
        <div className="info-item-wrapper" key={k}>
          <Container data-type="infographic" className="info-item">
            <a href="#" className={k} onClick={e => onClickItem(itemIndex, e, "infographic")}>
              <Image src={src} originalimg={originalimg} filename={filename} srcSet={srcset} sizes={sizes} height={commonHeight} width={width} alt={alt} />
            </a>
          </Container>
        </div>
      );
    } else if (item.type == "logos") {
      const src = item.src;
      const alt = item.alt;

      let srcset;
      let sizes;

      if (item.srcset) {
        srcset = item.srcset.join();
      }
      if (item.sizes) {
        sizes = item.sizes.join();
      }

      return (
        <div className="logo-wrapper" key={k}>
          <Container data-type="logos" className="logo-item">
            <a href="#" className={k} onClick={e => onClickItem(itemIndex, e, "logos")}>
              <Image src={src} originalimg={originalimg} filename={filename} srcSet={srcset} sizes={sizes} height={commonHeight} width={width} alt={alt} />
            </a>
          </Container>
        </div>
      );
    }
  }

  renderGallery(itemNodePreviewNodes) {
    return (
      <div id="Gallery" className=" clearfix " ref={c => (this._gallery = c)}>
        {this.state.isLoading ? (
          <LoaderWrapper>
            <Loader type="Grid" color="#666" height={50} width={50} />
          </LoaderWrapper>
        ) : (
          <div className="item-wrapper">{itemNodePreviewNodes}</div>
        )}
      </div>
    );
  }
}
Gallery.displayName = "Gallery";
Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
  cols: PropTypes.number,
  margin: PropTypes.number
};
Gallery.defaultProps = {
  cols: 3,
  onClickItem: (k, e) => {
    e.preventDefault();
  },
  margin: 2
};

export default Gallery;
