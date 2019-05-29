export const newDimensions = main => {
  const { width, height } = main.getBoundingClientRect();
  return { width, height };
};

export const setDimensions = (canvas, { width, height }) => {
  canvas.style = {
    ...canvas.style,
    width: `${width}px`,
    height: `${height}px`
  };
};
