import React from 'react';
import './../../index.css';
import './../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0.0
    };
    this.increment = this.increment.bind(this);
    this.stop = this.stop.bind(this);
  }

  increment() {
    let start = new Date().getTime();
    let global = this;
    this.stopwatch = setInterval(function () {
      this.temp = new Date().getTime() - start;
      global.setState({
        time: parseFloat(Math.floor(this.temp / 100) / 10).toFixed(1)
      });
    }, 100);
  }

  stop() {
    clearInterval(this.stopwatch);
  }

  render() {
    return (
      <div>
        <input className="special-input" value={this.state.time} readOnly />
        <br />
        <div className="special-btn-wrap">
          <button className="btn waves-effect waves-light red" onClick={this.stop}>Stop</button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <button className="btn waves-effect waves-light green" onClick={this.increment}>Start</button>
        </div>
      </div>
    );
  }
};
