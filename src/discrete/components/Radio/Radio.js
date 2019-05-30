import React from "react";
import PropTypes from "prop-types";

/**
 * A Labelled Radio Button component for use on the Discrete Scale
 */
const Radio = ({
  index,
  value,
  id,
  defaultChecked,
  secondaryLabel: secondaryLabelText,
  labelAbove,
  labelColor,
  fontFamily,
  fontSize
}) => {
  const handleClick = () => {
    document.dispatchEvent(
      new CustomEvent("DiscreteSelected", {
        detail: {
          index,
          value
        }
      })
    );
  };

  const label = useMemo(
    () => (
      <RadioLabel
        labelColor={labelColor}
        fontFamily={fontFamily}
        fontSize={fontSize}
        above={labelAbove}
        htmlFor={id}
      >
        {value}
      </RadioLabel>
    ),
    [labelColor, fontFamily, fontSize, labelAbove, id]
  );

  const secondaryLabel = useMemo(
    () =>
      secondaryLabelText ? (
        <SecondaryRadioLabel
          labelColor={labelColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          above={labelAbove}
          htmlFor={id}
        >
          {secondaryLabelText}
        </SecondaryRadioLabel>
      ) : null,
    [secondaryLabelText, labelColor, fontFamily, fontSize, labelAbove, id]
  );

  return (
    <RadioContainer>
      {labelAbove && secondaryLabel}
      {labelAbove && label}
      <RadioInput
        id={id}
        value={value}
        onClick={handleClick}
        defaultChecked={defaultChecked}
      />
      {!labelAbove && label}
      {!labelAbove && secondaryLabel}
    </RadioContainer>
  );
};

Radio.propTypes = {
  /** The index of this Radio component in an array of Radio components. */
  index: PropTypes.number.isRequired,
  /** The value of this Radio component. */
  value: PropTypes.string.isRequired,
  /** Value to be used as the RadioInput's id. */
  id: PropTypes.string.isRequired,
  /** CSS Color value for any labels associated with this Radio component. */
  labelColor: PropTypes.string,
  /** A valid CSS Font Family value for any labels associated with this Radio component. */
  fontFamily: PropTypes.string,
  /** A valid CSS Font Size value for any labels associated with this Radio component. */
  fontSize: PropTypes.string,
  /** Whether the RadioInput should default to being checked. */
  defaultChecked: PropTypes.bool,
  /** Whether RadioLabels should be above or below the RadioInput. */
  labelAbove: PropTypes.bool,
  /** Optional text for a secondary label */
  secondaryLabel: PropTypes.string
};

Radio.defaultProps = {
  labelColor: "black",
  fontFamily: "Arial",
  fontSize: "1.2em",
  labelAbove: false
};

/** @component */
export default Radio;
