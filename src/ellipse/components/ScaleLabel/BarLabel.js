import styled from "styled-components";
import { labelDistance } from "../../consts";

export const propTypes = {
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

/** A label at a position */
const BarLabel = styled.label`
  color: ${({ labelColor: x }) => x};
  font-family: ${({ fontFamily: x }) => x};
  font-size: ${({ fontFamily: x }) => x};
  margin-left: 0;
  position: absolute;
  left: ${({ yAlign: x }) => {
    switch (x) {
      case "below":
        return "0.05em";
      default:
        return "0";
    }
  }};
  transform: ${({ yAlign, labelIndex }) => {
    let yTransform = "";
    // specific cases
    if (yAlign === "center") {
      yTransform = "translateY(-50%)";
      switch (labelIndex) {
        case 0: // min label (left)
          return `${yTransform} translateX(calc(-100% + ${labelDistance} * -1))`;
        case 2: // max label (right)
          return `${yTransform} translateX(${labelDistance})`;
      }
    }

    // Default
    return `${yTransform} translateX(-50%)`;
  }};
  white-space: nowrap;
  margin-top: ${({ yAlign: x }) => {
    switch (x) {
      case "above":
        return `calc(${labelDistance} * -1)`;
      case "center":
        return "0";
      case "below":
        return labelDistance;
    }
  }};
`;

BarLabel.propTypes = propTypes;

BarLabel.defaultProps = {
  labelColor: "black",
  fontFamily: "Arial",
  fontSize: "1.2em",
  labelIndex: 0
};
