import React from 'react';
import '../index.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';
import Checkbox from './modules/Checkbox';
import Counter from './modules/Counter';
import Radio from './modules/Radio';
import Input from './modules/Input';
import Login from './modules/Login';
import Stopwatch from './modules/Stopwatch';
import Textarea from './modules/Textarea';


export default class Module extends React.Component {
  constructor(props) {
    super(props);
  }

  module() {
    let module;
    let type = this.props.module.type;
    let option = this.props.module.options;
    switch (type) {
      case 'checkbox':
        module = <Checkbox name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey } />;
        break;
      case 'counter':
        module = <Counter name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props. jsonKey } />;
        break;
      case 'input':
        module = <Input name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey} />;
        break;
      case 'login':
        module = <Login name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey} />;
        break;
      case 'radio':
        module = <Radio name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey } />;
        break;
      case 'stopwatch':
        module = <Stopwatch name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey } />;
        break;
      case 'textarea':
        module = <Textarea name={ this.props.name } option={ option } file={ this.props.file } jsonKey={ this.props.jsonKey } />;
        break;
    }
    return module;
  }

  render() {
    return (
      <div className="question question-container">
        <h4 className="question-name">{ this.props.name }</h4>
        { this.module() }
      </div>
    );
  }
};
