import React from "react";
import Frame from "../core/StyledFrame";
import ScaleBar from "../core/StyledScaleBar";
import Question from "../core/StyledQuestion";
import Radio from "./radio";

// This is the actual complete reusable Likert Scale component,
// composed of various sub components
class LikertScale extends React.Component {
  render() {
    const radios = [];
    for (let i = 0; i < 7; i++) {
      const id = `radio${i + 1}`;
      if (this.props[id])
        radios.push(
          <Radio
            labelColor={this.props.labelColor}
            labelFont={this.props.labelFont}
            labelFontSize={this.props.labelFontSize}
            labelAlignment={this.props.labelAlignment}
            id={id}
            key={id}
            index={i}
            defaultChecked={this.props.initialIndex === i}
            value={this.props[id]}
            secondaryLabel={this.props[`${id}Secondary`]}
          />
        );
    }

    return (
      <Frame frameHeight={this.props.frameHeight}>
        <Question
          questionColor={this.props.questionColor}
          questionTop={this.props.questionTop}
          questionFont={this.props.questionFont}
          questionFontSize={this.props.questionFontSize}
          questionHorz={this.props.questionHorz}
          questionAlignment={this.props.questionAlignment}
        >
          {this.props.question}
        </Question>
        <ScaleBar
          barLeft={this.props.barLeft}
          barRight={this.props.barRight}
          barTop={this.props.barTop}
          barThickness={this.props.barThickness}
          barColor={this.props.barColor}
        >
          {radios}
        </ScaleBar>
      </Frame>
    );
  }
}

export default LikertScale;
