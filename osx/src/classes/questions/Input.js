import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {

  }

  render() {
    return (
      <div className="input-field">
        <input id={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')} type="text" onKeyUp={this.save()} />
        <label htmlFor={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')}>{this.props.option.placeholder}</label>
      </div>
    );
  }
};
