import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * A reusable question component for a scale component.
 */
const StyledQuestion = styled.div`
  color: ${({ textColor: x }) => x};
  position: absolute;
  top: ${({ topMargin: x }) => x};
  font-family: ${({ fontFamily: x }) => x};
  font-size: ${({ fontSize: x }) => x};
  text-align: ${({ xAlign: x }) => x}
  width: ${({ xAlign: x }) => {
    switch (x) {
      case "center":
      case "right":
        return "inherit";
      default:
        return "initial";
    }
  }};
  margin: ${({ xAlign, xMargin }) => {
    switch (xAlign) {
      case "center":
      case "right":
        return "auto";
      default:
        return `0 ${xMargin}`;
    }
  }};
  transform: ${({ xAlign, xMargin }) => {
    switch (xAlign) {
      case "right":
        return `translate(calc(${xMargin} * -1))`;
      default:
        return "unset";
    }
  }};
`;

StyledQuestion.propTypes = {
  /** A valid CSS Color value for the question color. */
  textColor: PropTypes.string,
  /** A valid CSS Dimension value for the question top margin. */
  topMargin: PropTypes.string,
  /**
   * A valid CSS Dimension value for the question left or right margin.
   *
   * The use of this value depends on alignment. It is ignored for `center` alignment,
   * otherwise it is used as a margin on the aligned side (`left` or `right`).
   */
  xMargin: PropTypes.string,
  /** A valid CSS Font Family value for the question font. */
  fontFamily: PropTypes.string,
  /** A valid CSS Font Size value for the question font size. */
  fontSize: PropTypes.string,
  /** Text alignment of the question within the frame. */
  xAlign: PropTypes.oneOf(["left", "center", "right"])
};

StyledQuestion.defaultProps = {
  textColor: "black",
  topMargin: "10%",
  xMargin: "5%",
  fontFamily: "Arial",
  fontSize: "1.6em",
  xAlign: "left"
};

/** @component */
export default StyledQuestion;
