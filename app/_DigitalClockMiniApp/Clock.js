import React from "react";
import Digit from "./Digit";
import PropTypes from "prop-types";

const Clock = props => {
  return (
    <div>
      <Digit value={props.hours} />
      {" : "}
      <Digit value={props.minutes} />
      {" : "}
      <Digit value={props.seconds} />
      {" : "}
      <Digit value={props.tenths} />
    </div>
  );
};

Clock.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  tenths: PropTypes.number.isRequired
};

export default Clock;
