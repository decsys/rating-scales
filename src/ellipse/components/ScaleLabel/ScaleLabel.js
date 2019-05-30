import React from "react";
import PropTypes from "prop-types";
import BarLabel, { propTypes } from "./BarLabel";

const ScaleLabel = ({ value, ...p }) => (
  <LabelPoint>
    <BarLabel {...p}>{value}</BarLabel>
  </LabelPoint>
);

ScaleLabel.propTypes = {
  /** The actual label text */
  value: PropTypes.string.isRequired,
  ...propTypes
};

export default ScaleLabel;
