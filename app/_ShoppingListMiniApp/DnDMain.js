import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "./Container";

class DnDMain extends Component {
  render() {
    return <Container />;
  }
}

ReactDOM.render(<DnDMain />, document.getElementById("root"));
