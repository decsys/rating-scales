import styled from "styled-components";
import { FrameHeight, BaseFontSize } from "../utils/defaults";

/**
 * A containing frame for a scale component
 *
 * Styled `<div>` - properties listed can be passed as `props` to the React Component
 * @module
 *
 * @property {string} [frameHeight] CSS Value for the height of the Frame
 */
const frame = styled.div`
  height: ${props => props.frameHeight || FrameHeight};
  width: 100%;
  position: relative;
  font-size: ${BaseFontSize};
`;

export default frame;
