import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  save() {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    json[this.props.jsonKey][this.props.name] = this.state.value;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    }, () => this.save());
  }

  render() {
    return (
      <div className="input-field">
        <label htmlFor={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}>{this.props.option.placeholder}</label>
        <textarea className="materialize-textarea" id={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')} onChange={this.handleChange}></textarea>
      </div>
    );
  }
};
