import React from 'react';
import './../index.css';
import './../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../node_modules/materialize-css/dist/js/materialize.min';
import Checkbox from './questions/Checkbox';
import Counter from './questions/Counter';
import Radio from './questions/Radio';
import Input from './questions/Input';
import Stopwatch from './questions/Stopwatch';
import Textarea from './questions/Textarea';


export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  question() {
    this.questions = [];
    this.index = 0;
    this.type = this.props.question.type;
    this.option = this.props.question.options;
    switch (this.type) {
      case 'checkbox':
        for (let question in this.option) {
          if (this.option.hasOwnProperty(question)) {
            this.questions.push(
              <Checkbox key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option[question]} question={question} />
            );
            this.index++;
          }
        }
        break;
      case 'counter':
        this.questions.push(
          <Counter key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option} />
        );
        break;
      case 'input':
        this.questions.push(
          <Input key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option} />
        );
        break;
      case 'radio':
        for (let question in this.option) {
          if (this.option.hasOwnProperty(question)) {
            this.questions.push(
              <Radio key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option[question]} question={question} />
            );
            this.index++;
          }
        }
        break;
      case 'stopwatch':
        this.questions.push(
          <Stopwatch key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option} />
        );
        break;
      case 'textarea':
        this.questions.push(
          <Textarea key={`${this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}-${this.index}`} name={this.props.name} option={this.option} />
        );
        break;
    }
    return this.questions;
  }

  render() {
    return (
      <div className="question question-container">
        <h3 className="question-name">{this.props.name}</h3>
        {this.question()}
      </div>
    );
  }
};
