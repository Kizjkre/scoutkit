import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>
        <label>
          <input className="with-gap" name={this.props.name.toLowerCase().replace(/[^\w\d]/g, '-')} type="radio" />
          <span>{this.props.question}</span>
        </label>
      </p>
    );
  }
};
