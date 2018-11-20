import React from "React";
import PropTypes from "prop-types";
import styled from "styled-components";
import ScaleMarker from "./ScaleMarker";

const ScaleMarkerContainer = styled.div`
  position: relative;
`;

/** A set of equally spaced ScaleMarkers, essentially forming a scale along the RangeBar */
export default class ScaleMarkerSet extends React.Component {
  static propTypes = {
    /** A valid CSS Color value for the marker */
    markerColor: PropTypes.string,
    /** A valid CSS Dimension value for the length of the marker */
    length: PropTypes.string,
    /** A valid CSS Dimension value for the thickness of the marker */
    thickness: PropTypes.string
  };

  render() {
    return [
      <ScaleMarkerContainer key={"marker1"}>
        <ScaleMarker {...this.props} />
      </ScaleMarkerContainer>,
      <ScaleMarkerContainer key={"marker2"}>
        <ScaleMarker {...this.props} />
      </ScaleMarkerContainer>
    ];
  }
}
