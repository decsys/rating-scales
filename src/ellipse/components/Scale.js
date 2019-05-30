import React, { createRef, useState, useMemo, useRef, useEffect } from "react";
import "../pixi";
import { Application } from "@pixi/app";
import RangeBar from "./RangeBar";
import ScaleLabel from "./ScaleLabel";
import RangeMarker from "./RangeMarker";
import EllipseCanvas from "./Canvas";
import * as Canvas from "../utils/canvas";
import PenLine from "../pen-line";
import { Frame, Question, Container } from "../../core";
import { useElementRef } from "../../hooks";
import UnitValue from "unit-value";
import ScaleMarkerSet from "./ScaleMarkerSet";

// private static helpers

const getScrolledY = y => y + window.pageYOffset;

const resizeHandler = (app, main, ...elems) => {
  const { width, height } = Canvas.newDimensions(main, ...elems);
  Canvas.setDimensions(app.view, { width, height });
  app.renderer.resize(width, height);
};

const EllipseScale = ({
  frameHeight,
  question,
  questionOptions,
  barOptions,
  scaleMarkerOptions,
  heightElements: heightElementsSelector = null,
  penOptions,
  minRangeValue: initialMinRangeValue,
  maxRangeValue: initialMaxRangeValue
}) => {
  const [canvas, canvasRef] = useElementRef(); // canvas DOM element
  const [rangeBar, rangeBarRef] = useElementRef(); // RangeBar component. may not need after we lift up state
  const [maxMarker, maxMarkerRef] = useElementRef(); // marker DOM elements
  const [minMarker, minMarkerRef] = useElementRef(); // shouldn't need due to prop changes

  const [outputs, setOutputs] = useState();

  // const mainElement = useRef(); // maybe just reference the canvas directly
  // useEffect(() => (mainElement.current = canvas.current.parentElement));

  const heightElements = useMemo(
    () => document.querySelectorAll(heightElementsSelector),
    heightElementsSelector
  );

  // Event handlers
  const handlePointerDown = ({ data }) => {
    if (data.originalEvent.buttons === 1)
      pen.reset({ x: data.global.x, y: data.global.y });
  };

  const handlePointerMove = ({ data }) => {
    if (data.originalEvent.buttons === 1) {
      const { x, y } = data.global;
      // also check we are in the hit area
      // (we don't care for moves outside it)
      if (app.stage.hitArea.contains(x, y)) pen.addPoint({ x, y });
    }
  };

  // Initialise PIXI
  const appRef = useRef();
  const [app, setApp] = useState();
  useEffect(() => {
    // Init
    appRef.current = new Application({
      width: 0,
      height: 0,
      view: canvas,
      resolution: window.devicePixelRatio,
      antialias: true,
      transparent: true
    });
    setApp(app.current);

    // Event handling
    app.stage.interactive = true;
    app.stage.hitArea = app.screen;
    app.stage.pointerdown = handlePointerDown;
    app.stage.pointermove = handlePointerMove;
    app.stage.pointerup = handlePointerUp;
  }, [canvas]); // is this a good idea? or should we use the ref directly

  // Initialise the PenLine
  const penRef = useRef();
  const [pen, setPen] = useState();
  useEffect(() => {
    if (app !== app) {
      // penOptions alone is no reason to create a new pen
      // TODO: it might be reason to change the pen options though...
      penRef.current = new PenLine(app.stage, penOptions);
      setPen(penRef.current);
    }
  }, [app, penOptions]);

  // Initial Range Bar Markers
  const [minRangeValue, setMinRangeValue] = useState(initialMinRangeValue);
  const [maxRangeValue, setMaxRangeValue] = useState(initialMaxRangeValue);

  return (
    <Frame key="EllipseFrame" frameHeight={frameHeight}>
      <EllipseCanvas key="EllipseCanvas" ref={canvasRef} />
      <Question {...questionOptions}>{question}</Question>
      <RangeBar ref={rangeBarRef} {...barOptions}>
        <Container>
          <ScaleMarkerSet {...scaleMarkerOptions} />
        </Container>
        <Container>{labels}</Container>
        <RangeMarker {...rangeMarkerProps} ref={minMarkerRef} />
        <RangeMarker {...rangeMarkerProps} ref={maxMarkerRef} />
      </RangeBar>
    </Frame>
  );
};

/** An Ellipse Scale */
export default class EllipseScale extends React.Component {
  constructor(props) {
    super(props);
    this.outputs = {};

    this.frame = createRef();
  }

  componentDidMount() {
    // store these to avoid selecting them everytime
    this.mainElement = this.canvas.parentElement;
    this.heightElements = this.props.heightElements
      ? document.querySelectorAll(this.props.heightElements)
      : [];

    // initialise pixi
    this.app = new Application({
      width: 0,
      height: 0,
      view: this.canvas,
      resolution: window.devicePixelRatio,
      antialias: true,
      transparent: true
    });

    this.pen = new Pen(this.app.stage, this.props.penOptions);

    // Set Initial Range Bar Markers
    this.setRangeMarker(this.minMarker, this.props.minRangeValue, true);
    this.setRangeMarker(this.maxMarker, this.props.maxRangeValue, true);

    // input events
    this.app.stage.interactive = true;
    this.app.stage.hitArea = this.app.screen;

    this.app.stage.pointerdown = e => {
      if (e.data.originalEvent.buttons === 1)
        this.pen.reset({ x: e.data.global.x, y: e.data.global.y });
    };

    this.app.stage.pointermove = e => {
      if (e.data.originalEvent.buttons === 1) {
        const { x, y } = e.data.global;
        // also check we are in the hit area
        // (we don't care for moves outside it)
        if (this.app.stage.hitArea.contains(x, y)) this.pen.addPoint({ x, y });
      }
    };

    this.app.stage.pointerup = () => {
      const { x, y, width } = this.rangeBar.bounds;
      this.pen.closePath(); // complete the ellipse

      const { top, left } = this.canvas.getBoundingClientRect();
      let hits = this.pen.findIntersections(
        getScrolledY(y) - getScrolledY(top)
      );

      // validate the PenLine hits
      if (hits.length !== 1) {
        // offset hits here so we don't clamp wrong
        hits = hits.map(x => x + left);

        // 1 hit is valid outside the line
        //multiple hits have can't all be the same side
        const allLeft = hits.every(hit => hit < x);
        const allRight = hits.every(hit => hit > x + width);
        if (allLeft || allRight) {
          this.resetPenLine(this.pen, 0, 0);
          return;
        }
      }

      // update state if a complete ellipse drawn:
      // get min, max x hits
      const min = Math.min(...hits.map(hit => hit));
      const max = Math.max(...hits.map(hit => hit));

      // Convert and apply them
      this.setRange(min, max);

      // mark completed
      this.outputs.completed = true;

      // Dispatch a completed event from the attached canvas
      document.dispatchEvent(
        new CustomEvent("EllipseCompleted", { detail: this.outputs })
      );
    };

    //hook up the resize handler
    window.onresize = () =>
      resizeHandler(this.app, this.mainElement, ...this.heightElements);

    //also call it now to position and size the canvas at first run
    resizeHandler(this.app, this.mainElement, ...this.heightElements);
  }

  setRange(min, max, values = false) {
    const vmin = values ? min : this.rangeBar.getValueForX(min);
    const vmax = values ? max : this.rangeBar.getValueForX(max);
    // "store" the values
    this.outputs.minRangeValue = vmin;
    this.outputs.maxRangeValue = vmax;
    // Set Range Bar Markers
    this.setRangeMarker(this.minMarker, min, values);
    this.setRangeMarker(this.maxMarker, max, values);
  }

  setRangeMarker(marker, position, isValue = false) {
    if (position == null) marker.style.display = "none";
    else {
      const x = isValue
        ? this.rangeBar.getXPosForValue(position)
        : this.rangeBar.getRelativeXPos(position);
      marker.style.left = `${x}px`;
      marker.style.display = "block";
    }
  }

  resetPenLine(x, y) {
    this.outputs.completed = false;
    this.pen.reset({ x, y });
  }

  render() {
    const labels = [];
    const labelValues = [
      this.props.labels.min,
      this.props.labels.mid,
      this.props.labels.max
    ];
    for (let i = 0; i < labelValues.length; i++) {
      labels.push(
        <ScaleLabel
          key={`scale-label-${i}`}
          labelIndex={i}
          {...this.props.labelOptions}
          value={labelValues[i]}
        />
      );
    }

    // pre-calculate these so they can apply to both markers
    const rangeMarkerProps = {
      markerColor: this.props.rangeMarkerOptions.markerColor,
      thickness:
        this.props.rangeMarkerOptions.thickness != null
          ? this.props.rangeMarkerOptions.thickness
          : this.props.barOptions.thickness,

      length:
        this.props.rangeMarkerOptions.length != null
          ? this.props.rangeMarkerOptions.length
          : UnitValue.multiply(this.props.barOptions.thickness, 1.5).toString()
    };

    // adjust scale marker defaults if necessary
    this.props.scaleMarkerOptions.thickness =
      this.props.scaleMarkerOptions.thickness != null
        ? this.props.scaleMarkerOptions.thickness
        : this.props.barOptions.thickness;
    this.props.scaleMarkerOptions.length =
      this.props.scaleMarkerOptions.length != null
        ? this.props.scaleMarkerOptions.length
        : UnitValue.multiply(this.props.barOptions.thickness, 8).toString();

    return [
      <Frame key="EllipseFrame" frameHeight={this.props.frameHeight}>
        <EllipseCanvas key="EllipseCanvas" ref={e => (this.canvas = e)} />
        <Question {...this.props.questionOptions}>
          {this.props.question}
        </Question>
        <RangeBar ref={e => (this.rangeBar = e)} {...this.props.barOptions}>
          <FlexContainer>
            <ScaleMarkerSet {...this.props.scaleMarkerOptions} />
          </FlexContainer>
          <FlexContainer>{labels}</FlexContainer>
          <RangeMarker {...rangeMarkerProps} ref={e => (this.minMarker = e)} />
          <RangeMarker {...rangeMarkerProps} ref={e => (this.maxMarker = e)} />
        </RangeBar>
      </Frame>
    ];
  }
}
