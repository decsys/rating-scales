import styled from "styled-components";
import PropTypes from "prop-types";

export const propTypes = {
  /** A valid CSS Color value for the marker */
  markerColor: PropTypes.string,
  /** A valid CSS Dimension value for the length of the marker */
  length: PropTypes.string,
  /** A valid CSS Dimension value for the thickness of the marker */
  thickness: PropTypes.string
};

/**
 * A marker for the RangeBar to indicate a point along the scale
 */
const ScaleMarker = styled.div`
  position: absolute;
  &::before {
    border-left: ${({ thickness, markerColor }) =>
      `${thickness} solid ${markerColor}`};
    position: absolute;
    min-height: ${({ length: x }) => x};
    top: ${({ length: x }) => `calc(${x} / -2)`};
    left: ${({ thickness: x }) => `calc(${x} / -2)`};
    z-index: 2;
    content: "";
  }
`;

ScaleMarker.propTypes = propTypes;

ScaleMarker.defaultProps = {
  markerColor: "black"
};

/** @component */
export default ScaleMarker;
