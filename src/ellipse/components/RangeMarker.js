import styled from "styled-components";
import PropTypes from "prop-types";
import ScaleMarker, { propTypes } from "./ScaleMarker";

/**
 * A marker for the RangeBar to indicate
 * the range of an ellipse drawn against the bar
 */
const RangeMarker = styled(ScaleMarker)`
  position: ${({ position: x }) => x}
  &::before {
    z-index: 3;
  }
`;

RangeMarker.propTypes = {
  ...propTypes,
  position: PropTypes.string.isRequired
};

RangeMarker.defaultProps = {
  markerColor: "black"
};

/** @component */
export default RangeMarker;
