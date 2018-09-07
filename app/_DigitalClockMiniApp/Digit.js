import React, { Component } from "react";
import PropTypes from "prop-types";

class Digit extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Don’t trigger a re-render unless the digit value has changed
    return nextProps.value !== this.props.value;
  }
  render() {
    let digitStyle = {
      display: "inline-block",
      fontSize: 20,
      padding: 10,
      margin: 5,
      background: "#eeeeee"
    };
    let displayValue;
    if (this.props.value < 10) {
      displayValue = "0" + this.props.value;
    } else {
      displayValue = this.props.value;
    }

    return <div style={digitStyle}>{displayValue}</div>;
  }
}

Digit.propTypes = {
  value: PropTypes.number.isRequired
};

export default Digit;
