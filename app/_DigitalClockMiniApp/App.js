import React, { Component } from "react";
import ReactDOM from "react-dom";
import Clock from "./Clock";
import Perf from "react-addons-perf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(this.getTime());
    }, 10);
  }

  getTime() {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      tenths: Math.floor(now.getMilliseconds()/10)
    };
  }

  render() {
    return (
      <Clock
        hours={this.state.hours}
        minutes={this.state.minutes}
        seconds={this.state.seconds}
        tenths={this.state.tenths}
      />
    );
  }
}

Perf.start();
ReactDOM.render(<App />, document.getElementById("root"));
setTimeout(()=>{
    Perf.stop();
    Perf.printWasted();
},2000)