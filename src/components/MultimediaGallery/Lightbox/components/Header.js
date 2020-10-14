import PropTypes from "prop-types";
import React from "react";
import { css, StyleSheet } from "aphrodite/no-important";

import defaults from "../theme";
import bindFunctions from "../utils/bindFunctions";
import canUseDom from "../utils/canUseDom";
import deepMerge from "../utils/deepMerge";
import Icon from "./Icon";

function Header({ customControls, onClose, showCloseButton, closeButtonTitle, ...props }, { theme }) {
  const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

  return (
    <div className={css(classes.header)} {...props}>
      {customControls ? customControls : <span />}
      {!!showCloseButton && (
        <button title={closeButtonTitle} className={` ${css(classes.close)} btnclose`} onClick={onClose}>
          <Icon fill={(!!theme.close && theme.close.fill) || defaults.close.fill} type="close" />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  customControls: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool
};
Header.contextTypes = {
  theme: PropTypes.object.isRequired
};

const defaultStyles = {
  header: {},
  close: {
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
    position: "absolute",
    right: "0",
    top: "12px",
    height: 40,
    width: 40
  }
};

export default Header;
