import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Textarea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="input-field">
        <label htmlFor={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}>{this.props.option.placeholder}</label>
        <textarea className="materialize-textarea" id={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')} type="text"></textarea>
      </div>
    );
  }
};
