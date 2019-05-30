import React from "react";
import PropTypes from "prop-types";

/** A positionable label for a ScaleBar */
export default class ScaleLabel extends React.Component {
  static propTypes = {
    /** The actual label text */
    value: PropTypes.string.isRequired,

    /** A valid CSS Color value for the label text */
    labelColor: PropTypes.string,

    /** A valid CSS Font Family value for any labels associated with this Radio component. */
    fontFamily: PropTypes.string,

    /** A valid CSS Font Size value for any labels associated with this Radio component. */
    fontSize: PropTypes.string,

    /** Vertical alignment of the label relative to its position */
    yAlign: PropTypes.oneOf(["above", "center", "below"]),

    /**
     * The index of the position of the label relative to the Scale Bar.
     * 0 - hard left, 1 - center, 2 - hard right
     */
    labelIndex: PropTypes.number
  };

  render() {
    return (
      <LabelPoint>
        <BarLabel {...this.props}>{this.props.value}</BarLabel>
      </LabelPoint>
    );
  }
}
