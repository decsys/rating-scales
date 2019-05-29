import styled from "styled-components";

/** An HTML Canvas element with styling applied, to be used for ellipse drawing */
const StyledCanvas = styled.canvas`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
`;

/** @component */
export default StyledCanvas;
