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
    let questions;
    let type = this.props.question.type;
    let option = this.props.question.options;
    switch (type) {
      case 'checkbox':
        questions = <Checkbox name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
      case 'counter':
        questions = <Counter name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
      case 'input':
        questions = <Input name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
      case 'radio':
        questions = <Radio name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
      case 'stopwatch':
        questions = <Stopwatch name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
      case 'textarea':
        questions = <Textarea name={this.props.name} option={option} file={this.props.file} jsonKey={this.props.jsonKey} />;
        break;
    }
    return questions;
  }

  render() {
    return (
      <div className="question question-container">
        <h4 className="question-name">{this.props.name}</h4>
        {this.question()}
      </div>
    );
  }
};
