import PropTypes from "prop-types";
import styled from "styled-components";
import { labelDistance } from "../../consts";

/**
 * A styled label that can be above or below a radio button.
 */
export const RadioLabel = styled.label`
  color: ${({ labelColor: x }) => x};
  font-family: ${({ fontFamily: x }) => x};
  font-size: ${({ fontSize: x }) => x};
  margin-left: 0.6rem;
  position: absolute;
  left: ${({ above: x }) => (x ? "0" : "0.05em")};
  transform: translateX(-50%);
  white-space: nowrap;
  margin-top: ${({ above: x }) =>
    x ? `calc(${labelDistance} * -1)` : labelDistance};
`;
RadioLabel.propTypes = {
  /** A valid CSS Color value for the label text. */
  labelColor: PropTypes.string.isRequired,
  /** A valid CSS Font Family value for the label text. */
  fontFamily: PropTypes.string.isRequired,
  /** A valid CSS Font Size value for the label text. */
  fontSize: PropTypes.string.isRequired,
  /** Whether the label is above or below the radio button. */
  above: PropTypes.bool
};

/**
 * A styled label that can be above or below a radio button.
 *
 * It's intended for use as a secondary label, further from the scale bar.
 */
export const SecondaryRadioLabel = styled(RadioLabel)`
  margin-top: ${({ above: x }) =>
    x ? `calc(${labelDistance} * -2)` : `calc(${labelDistance} * 2)`};
`;

/** @component */
export default {
  RadioLabel,
  SecondaryRadioLabel
};
