import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * A marker for the RangeBar to indicate a point along the scale
 */
const ScaleMarker = styled.div`
  position: absolute;
  &::before {
    border-left: ${props =>
      `${props.markerThickness} solid ${props.markerColor}`};
    position: absolute;
    min-height: ${props => props.markerLength};
    top: ${props => `calc(${props.markerLength} / -2)`};
    left: ${props => `calc(${props.markerThickness} / -2)`};
    z-index: 2;
    content: "";
  }
`;

ScaleMarker.propTypes = {
  /** A valid CSS Color value for the marker */
  markerColor: PropTypes.string,

  /** A valid CSS Dimension value for the length of the marker */
  length: PropTypes.string,

  /** A valid CSS Dimension value for the thickness of the marker */
  thickness: PropTypes.string
};

ScaleMarker.defaultProps = {
  markerColor: "black"
};

/** @component */
export default ScaleMarker;
