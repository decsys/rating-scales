import PropTypes from "prop-types";

export const propTypes = {
  /**
   * An array of css selectors for elements
   * to be used for calculating canvas height
   */
  heightElements: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),

  /** A valid CSS Dimension value for the height of the component's frame */
  frameHeight: PropTypes.string,

  /** Initial minimum range value */
  minRangeValue: PropTypes.number,

  /** Initial maximum range value */
  maxRangeValue: PropTypes.number,

  /** Options for the Pen Line appearance */
  penOptions: PropTypes.shape({
    /** A valid CSS Color value for the pen line */
    color: PropTypes.string,

    /** A numeric value for the pen line thickness */
    thickness: PropTypes.number
  }),

  /** Options for the scale's question text */
  questionOptions: PropTypes.shape({
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
  }),

  /** Question text to display */
  question: PropTypes.string,

  /** Options for the scale's horizontal bar */
  barOptions: PropTypes.shape({
    /**
     * The numeric value of the left hand end of the range bar
     * (the minimum possible value of the range)
     */
    minValue: PropTypes.number.isRequired,
    /**
     * The numeric value of the right hand end of the range bar
     * (the maximum possible value of the range)
     */
    maxValue: PropTypes.number.isRequired,
    /** A valid CSS Dimension value for the bar left margin. */
    leftMargin: PropTypes.string,
    /** A valid CSS Dimension value for the bar right margin. */
    rightMargin: PropTypes.string,
    /** A valid CSS Dimension value for the bar top margin. */
    topMargin: PropTypes.string,
    /** A valid CSS Color value for the bar color. */
    barColor: PropTypes.string,
    /** A valid CSS Dimension value for the bar thickness. */
    thickness: PropTypes.string
  }),

  /** Options for the range bar's fixed labels */
  labelOptions: PropTypes.shape({
    /** A valid CSS Color value for the label text */
    labelColor: PropTypes.string,
    /** A valid CSS Font Family value for any labels associated with this Radio component. */
    fontFamily: PropTypes.string,
    /** A valid CSS Font Size value for any labels associated with this Radio component. */
    fontSize: PropTypes.string,
    /** Vertical alignment of the label relative to its position */
    yAlign: PropTypes.oneOf(["above", "center", "below"])
  }),

  /** Fixed label values for the range bar */
  labels: PropTypes.shape({
    /** Label value for the left hand end */
    min: PropTypes.string,
    /** Central label value */
    mid: PropTypes.string,
    /** Label value for the right hand end */
    max: PropTypes.string
  }),

  /** Options for the Range Markers appearance */
  rangeMarkerOptions: PropTypes.shape({
    /** A valid CSS Color value for the marker */
    markerColor: PropTypes.string,
    /** A valid CSS Dimension value for the length of the marker */
    length: PropTypes.string,
    /** A valid CSS Dimension value for the thickness of the marker */
    thickness: PropTypes.string
  }),

  /** Options for the Scale Markers */
  scaleMarkerOptions: PropTypes.shape({
    /** A valid CSS Color value for the marker */
    markerColor: PropTypes.string,
    /** A valid CSS Dimension value for the length of the marker */
    length: PropTypes.string,
    /** A valid CSS Dimension value for the thickness of the marker */
    thickness: PropTypes.string
  })
};

export const defaultProps = {
  // default all shapes to empty objects
  // so we don't have to null check before accessing children
  // TODO: this is kinda terrible and we should do better someday
  penOptions: {},
  questionOptions: {},
  barOptions: {},
  labelOptions: {},
  labels: {},
  rangeMarkerOptions: {},
  scaleMarkerOptions: {}
};
