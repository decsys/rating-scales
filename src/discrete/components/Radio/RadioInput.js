import styled from "styled-components";

/**
 * A styled radio button input
 */
export const RadioInput = styled.input.attrs({
  type: "radio",
  name: "discrete"
})`
  transform: scale(2);
`;

/** @component */
export default RadioInput;
