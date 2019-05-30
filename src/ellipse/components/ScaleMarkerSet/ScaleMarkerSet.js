import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ScaleMarker from "./ScaleMarker";
import ScaleMarkerContainer from "./ScaleMarkerContainer";

/** A set of equally spaced ScaleMarkers, essentially forming a scale along the RangeBar */
const ScaleMarkerSet = ({
  subdivisions,
  markers,
  subColor,
  markerColor,
  subLength,
  length,
  subThickness,
  thickness
}) => {
  const markersMapArray = useMemo(
    () => Array(subdivisions * (markers - 1) + 1).fill(1),
    [subdivisions, markers]
  );
  const subProps = useMemo(
    () => ({
      markerColor: subColor != null ? subColor : markerColor,
      length: subLength != null ? subLength : length,
      thickness: subThickness != null ? subThickness : thickness
    }),
    [subColor, markerColor, subLength, length, subThickness, thickness]
  );

  return markersMapArray.map((_, i) => {
    const major = i === 0 || i % subdivisions === 0;
    return (
      <ScaleMarkerContainer key={`scaleMarker${i}`}>
        <ScaleMarker
          {...(major ? { markerColor, length, thickness } : subProps)}
        />
      </ScaleMarkerContainer>
    );
  });
};

ScaleMarkerSet.propTypes = {
  /** A valid CSS Color value for major markers */
  markerColor: PropTypes.string,
  /** A valid CSS Dimension value for the length of major markers */
  length: PropTypes.string,
  /** A valid CSS Dimension value for the thickness of major markers */
  thickness: PropTypes.string,
  /** A valid CSS Color value for subdivision markers */
  subColor: PropTypes.string,
  /** A valid CSS Dimension value for the length of subdivision markers */
  subLength: PropTypes.string,
  /** A valid CSS Dimension value for the thickness of subdividision markers */
  subThickness: PropTypes.string,
  /** The number of major markers to display along the scale bar */
  markers: PropTypes.number,
  /** The number of marker subdivisions */
  subdivisions: PropTypes.number
};

ScaleMarkerSet.defaultProps = {
  subdivisions: 1
};

/** @component */
export default ScaleMarkerSet;
