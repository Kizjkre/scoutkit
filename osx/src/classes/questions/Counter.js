import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleUpClick() {
    this.setState((prevState) => {
      return { count: prevState.value += this.props.option.increment }
    });
  }

  handleDownClick() {
    this.setState((prevState) => {
      return { count: prevState.value -= this.props.option.increment }
    });
  }

  render() {
    return (
      <div>
        <input className="special-input" value={this.state.value} readOnly />
        <br />
        <div className="special-btn-wrap">
          <button className="btn waves-effect waves-light red" onClick={this.handleDownClick}>-{this.props.option.increment}</button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <button className="btn waves-effect waves-light green" onClick={this.handleUpClick}>+{this.props.option.increment}</button>
        </div>
      </div>
    );
  }
};
