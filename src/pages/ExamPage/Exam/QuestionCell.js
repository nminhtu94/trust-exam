import React, { Component } from "react";
import { Typography, Divider } from 'antd';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const { Title, Paragraph, Text } = Typography;

class QuestionCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswer: null
    }
  }

  onChange = (e) => {
    this.setState({
      selectedAnswer: e.target.value,
    });
  }

  getAnswer = () => {
    return this.state.selectedAnswer;
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <Typography>
        <Paragraph>
          {(<b>{this.props.questionNumber + '. '}</b>)}{this.props.question.desc}
        </Paragraph>
        <RadioGroup
          onChange={this.onChange}
          value={this.state.selectedAnswer}>
          {
            this.props.question.choices.map((choice, index) => (
              <Radio style={radioStyle} value={index} key={Math.random().toString(36)}>
                {(<b>{String.fromCharCode(65 + index) + '. '}</b>)}{choice}
              </Radio>
            ))
          }
        </RadioGroup>
        <Divider />
      </Typography>
    );
  }
};

export default QuestionCell;