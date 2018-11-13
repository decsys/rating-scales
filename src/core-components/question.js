import styled from "styled-components";
import { Color, Font } from "../utils/defaults";

/**
 * Default Question Top Margin as a CSS value
 * @type {string}
 */
const questionTop = "10%";

/**
 * Default font size for this component as a CSS value.
 *
 * Relative values will be relative to the parent frame's base font size
 * @type {string}
 */
const questionFontSize = "1.6em";

/**
 * A reusable question component for a scale component
 *
 * Styled `<div>` - properties listed can be passed as `props` to the React Component
 * @module
 *
 * @property {string} [questionColor] CSS value for the question color
 * @property {string} [questionTop] CSS value for the question top margin
 * @property {string} [questionFont] CSS value for the question font
 * @property {string} [questionFontSize]
 * CSS value for the question font size
 *
 * Relative values will be relative to the parent frame's base font size
 */
const question = styled.div`
  color: ${props => props.questionColor || Color};
  position: absolute;
  top: ${props => props.questionTop || questionTop};
  font-family: ${props => props.questionFont || Font};
  font-size: ${props => props.questionFontSize || questionFontSize};
  text-align: ${props => props.questionAlignment}
  width: ${props => {
    switch (props.questionAlignment) {
      case "center":
      case "right":
        return "inherit";
      default:
        return "initial";
    }
  }};
  margin: ${props => {
    switch (props.questionAlignment) {
      case "center":
      case "right":
        return "auto";
      default:
        return `0 ${props.questionHorz || Defaults.Question.Horizontal}`;
    }
  }};
  transform: ${props => {
    switch (props.questionAlignment) {
      case "right":
        return `translate(calc(${props.questionHorz ||
          Defaults.Question.Horizontal} * -1))`;
      default:
        return "unset";
    }
  }};
`;

export default question;
