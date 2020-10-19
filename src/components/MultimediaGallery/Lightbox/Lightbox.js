import PropTypes from "prop-types";
import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite/no-important";
import ScrollLock from "react-scrolllock";

import defaultTheme from "./theme";
import Arrow from "./components/Arrow";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PaginatedThumbnails from "./components/PaginatedThumbnails";
import Portal from "./components/Portal";
import Icon from "./components/Icon";
import { myfunction } from "./utils";
import bindFunctions from "./utils/bindFunctions";
import canUseDom from "./utils/canUseDom";
import deepMerge from "./utils/deepMerge";
import styled from "styled-components";
import Loader from "react-loader-spinner";
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;
const DownloadButton = styled.button`
  right: 41;
  width: 100;
  position: absolute;
`;

const defaultStyles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: defaultTheme.header.height
  },
  close: {
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
    position: "relative",
    top: 10,
    verticalAlign: "bottom",

    // increase hit area
    height: 40,
    marginRight: -10,
    padding: 10,
    width: 40
  }
};

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    var foo = deepMerge(defaultTheme, props.theme);
    this.theme = foo;
    this.state = {
      isLightBoxLoading: props.isLightBoxLoading
    };
    bindFunctions.call(this, ["gotoNext", "gotoPrev", "closeBackdrop", "handleKeyboardInput"]);
  }

  getChildContext() {
    return {
      theme: this.theme
    };
  }

  componentDidMount() {
    if (this.props.isOpen && this.props.enableKeyboardInput) {
      window.addEventListener("keydown", this.handleKeyboardInput);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!canUseDom) return;
    if (nextProps.isLightBoxLoading !== this.props.isLightBoxLoading) {
      this.setState({
        isLightBoxLoading: nextProps.isLightBoxLoading
      });
    }
    // preload images
    if (nextProps.items.type == "images") {
      if (nextProps.preloadNextImage) {
        const currentIndex = this.props.currentItem;
        const nextIndex = nextProps.currentItem + 1;
        const prevIndex = nextProps.currentItem - 1;
        let preloadIndex;

        if (currentIndex && nextProps.currentItem > currentIndex) {
          preloadIndex = nextIndex;
        } else if (currentIndex && nextProps.currentItem < currentIndex) {
          preloadIndex = prevIndex;
        }

        // if we know the user's direction just get one image
        // otherwise, to be safe, we need to grab one in each direction
        if (preloadIndex) {
          this.preloadImage(preloadIndex);
        } else {
          this.preloadImage(prevIndex);
          this.preloadImage(nextIndex);
        }
      }
    }

    // add/remove event listeners
    if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
      window.addEventListener("keydown", this.handleKeyboardInput);
    }
    if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
      window.removeEventListener("keydown", this.handleKeyboardInput);
    }
  }
  componentWillUnmount() {
    if (this.props.enableKeyboardInput) {
      window.removeEventListener("keydown", this.handleKeyboardInput);
    }
  }

  // ==============================
  // METHODS
  // ==============================

  preloadImage(idx) {
    const image = this.props.items.items[idx];

    if (!image) return;

    const img = new Image();

    img.src = image.src;

    if (image.srcset) {
      img.srcset = image.srcset.join();
    }
  }
  gotoNext(event) {
    if (this.props.currentItem === this.props.items.items.length - 1) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickNext();
  }
  // Handle Image Download
  toDataURL(url) {
    return fetch(url)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        return URL.createObjectURL(blob);
      });
  }
  async handleImageDownload(src ,filename) {
    const a = document.createElement("a");
   
    a.href = await this.toDataURL(src);
    a.download = filename;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  gotoPrev(event) {
    if (this.props.currentItem === 0) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.onClickPrev();
  }
  closeBackdrop(event) {
    if (event.target.id === "lightboxBackdrop") {
      this.props.onClose();
    }
  }
  handleKeyboardInput(event) {
    if (event.keyCode === 37) {
      // left
      this.gotoPrev(event);
      return true;
    } else if (event.keyCode === 39) {
      // right
      this.gotoNext(event);
      return true;
    } else if (event.keyCode === 27) {
      // esc
      this.props.onClose();
      return true;
    }
    return false;
  }

  // ==============================
  // RENDERERS
  // ==============================

  renderArrowPrev() {
    if (this.props.currentItem === 0) return null;
    return <Arrow direction="left" icon="arrowLeft" onClick={this.gotoPrev} title={this.props.leftArrowTitle} type="button" />;
  }
  renderArrowNext() {
    if (this.props.currentItem === this.props.items.items.length - 1) return null;

    return <Arrow direction="right" icon="arrowRight" onClick={this.gotoNext} title={this.props.rightArrowTitle} type="button" />;
  }
  renderDialog() {
    const { backdropClosesModal, customControls, isOpen, onClose, showCloseButton, showThumbnails, width } = this.props;

    if (!isOpen) return <span key="closed" />;

    let offsetThumbnails = 0;
    if (showThumbnails) {
      offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
    }

    return (
      <Container key="open" onClick={!!backdropClosesModal && this.closeBackdrop} onTouchEnd={!!backdropClosesModal && this.closeBackdrop}>
        {this.state.isLightBoxLoading ? (
          <LoaderWrapper>
            <Loader type="Grid" color="#666" height={50} width={50} />
          </LoaderWrapper>
        ) : (
          <div>
            <div className={css(classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
              <Header
                customControls={customControls}
                onClose={onClose}
                showCloseButton={showCloseButton}
                closeButtonTitle={this.props.closeButtonTitle}
              />
              {this.renderItems()}
            </div>
            {this.renderThumbnails()}
            {this.renderArrowPrev()}
            {this.renderArrowNext()}
            <ScrollLock />
          </div>
        )}
      </Container>
    );
  }
  renderItems() {
    const { currentItem, items, imageCountSeparator, onClickImage, showImageCount, showThumbnails } = this.props;

    if (!items.items || !items.items.length) return null;

    if (items.type == "images") {
      const images = items.items;
      const image = images[currentItem];
      let srcset;
      let sizes;

      if (image.srcset) {
        srcset = image.srcset.join();
        sizes = "100vw";
      }
      const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
      const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical}px`;
      const classes = StyleSheet.create(deepMerge(defaultStyles, this.theme));
      return (
        <figure className={css(classes.figure)}>
          <button title="download" className="btn-download" onClick={e => this.handleImageDownload(image.originalimg,image.filename)}>
            Download
            <Icon fill={(!!this.theme.close && this.theme.close.fill) || defaultTheme.close.fill} type="download" />
          </button>
          <img
            className={css(classes.image)}
            sizes={sizes}
            alt={image.alt}
            src={image.src}
            srcSet={srcset}
            style={{
              cursor: this.props.onClickImage ? "pointer" : "auto",
              maxHeight: `calc(100vh - ${heightOffset})`
            }}
          />

          <Footer
            caption={image.caption}
            countCurrent={currentItem + 1}
            countSeparator={imageCountSeparator}
            countTotal={images.length}
            showCount={showImageCount}
          />
        </figure>
      );
    } else if (items.type == "logos") {
      const images = items.items;
      const image = images[currentItem];
      let srcset;
      let sizes;

      if (image.srcset) {
        srcset = image.srcset.join();
        sizes = "100vw";
      }
      const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
      const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical}px`;
      const classes = StyleSheet.create(deepMerge(defaultStyles, this.theme));
      return (
        <figure className={css(classes.figure)}>
          <img
            className={css(classes.image)}
            sizes={sizes}
            alt={image.alt}
            src={image.src}
            srcSet={srcset}
            style={{
              cursor: this.props.onClickImage ? "pointer" : "auto",
              maxHeight: `calc(100vh - ${heightOffset})`
            }}
          />
          <button title="download" className="btn-download" onClick={e => this.handleImageDownload(image.originalimg,image.filename)}>
            Download
            <Icon fill={(!!this.theme.close && this.theme.close.fill) || defaultTheme.close.fill} type="download" />
          </button>
          <Footer
            caption={image.caption}
            countCurrent={currentItem + 1}
            countSeparator={imageCountSeparator}
            countTotal={images.length}
            showCount={showImageCount}
          />
        </figure>
      );
    } else if (items.type == "infographic") {
      // const texts = items.items;
      // const text = texts[currentItem];

      // return (
      // 	<infographic className={css(classes.figure)}>
      // 		<p className='text_content'> {text} </p>
      // 	</infographic>
      // );
      const images = items.items;
      const image = images[currentItem];
      let srcset;
      let sizes;

      if (image.srcset) {
        srcset = image.srcset.join();
        sizes = "100vw";
      }
      const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
      const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical}px`;
      const classes = StyleSheet.create(deepMerge(defaultStyles, this.theme));
      return (
        <figure className={css(classes.figure)}>
          <img
            className={css(classes.image)}
            sizes={sizes}
            alt={image.alt}
            src={image.src}
            srcSet={srcset}
            style={{
              cursor: this.props.onClickImage ? "pointer" : "auto",
              maxHeight: `calc(100vh - ${heightOffset})`
            }}
          />

          <button title="download" className="btn-download" onClick={e => this.handleImageDownload(image.originalimg,image.filename)}>
            Download
            <Icon fill={(!!this.theme.close && this.theme.close.fill) || defaultTheme.close.fill} type="download" />
          </button>
          <Footer
            caption={image.caption}
            countCurrent={currentItem + 1}
            countSeparator={imageCountSeparator}
            countTotal={images.length}
            showCount={showImageCount}
          />
        </figure>
      );
    } else {
      const videos = items.items;
      const videoId = videos[currentItem];
      var width = Math.min(window.innerWidth - window.innerWidth / 5, 800);
      window.open(`${videoId}`, "_blank");
      this.props.onClose();
      // return (
      // 	// <div key={videoId} id={videoId} className="video-item">

      // 	// 	<iframe style={{ border: 'none' }} id={videoId} type="text/html" width={width} height={(3 * width) / 4}
      // 	// 		src={`${videoId}?autoplay=1&origin=http://antoniocamposruiz.com`} />
      // 	// </div>
      // );
    }
  }
  renderThumbnails() {
    const { items, currentItem, onClickThumbnail, showThumbnails, thumbnailOffset } = this.props;

    if (!showThumbnails) return;

    return <PaginatedThumbnails currentImage={currentItem} images={items.items} offset={thumbnailOffset} onClickThumbnail={onClickThumbnail} />;
  }
  render() {
    return <Portal>{this.renderDialog()}</Portal>;
  }
}

Lightbox.propTypes = {
  backdropClosesModal: PropTypes.bool,
  closeButtonTitle: PropTypes.string,
  currentItem: PropTypes.number,
  customControls: PropTypes.arrayOf(PropTypes.node),
  enableKeyboardInput: PropTypes.bool,
  imageCountSeparator: PropTypes.string,
  items: PropTypes.shape({
    type: PropTypes.oneOf(["images", "infographic", "videos", "logos"]).isRequired,
    items: PropTypes.array
  }).isRequired,
  isOpen: PropTypes.bool,
  leftArrowTitle: PropTypes.string,
  onClickImage: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  preloadNextImage: PropTypes.bool,
  rightArrowTitle: PropTypes.string,
  showCloseButton: PropTypes.bool,
  showImageCount: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  theme: PropTypes.object,
  thumbnailOffset: PropTypes.number,
  width: PropTypes.number
};
Lightbox.defaultProps = {
  closeButtonTitle: "Close (Esc)",
  currentItem: 0,
  enableKeyboardInput: true,
  imageCountSeparator: " of ",
  leftArrowTitle: "Previous (Left arrow key)",
  onClickShowNextImage: true,
  preloadNextImage: true,
  rightArrowTitle: "Next (Right arrow key)",
  showCloseButton: true,
  showImageCount: true,
  theme: {},
  thumbnailOffset: 2,
  width: 1024
};
Lightbox.childContextTypes = {
  theme: PropTypes.object.isRequired
};

const classes = StyleSheet.create({
  content: {
    position: "relative"
  },
  figure: {
    margin: 0 // remove browser default
  },
  image: {
    display: "block", // removes browser default gutter
    height: "auto",
    margin: "0 auto", // maintain center on very short screens OR very narrow image
    maxWidth: "100%",

    // disable user select
    WebkitTouchCallout: "none",
    userSelect: "none"
  }
});

export default Lightbox;
