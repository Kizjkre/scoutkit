import React from 'react';
import './../index.css';
import './../../node_modules/materialize-css/dist/css/materialize.min.css';
import './../../node_modules/materialize-css/dist/js/materialize.min';
import Section from './Section';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.position = 0;
  }

  handleNext() {
    this.position = this.position + 2 > Object.keys(this.props.app.app).length ? this.position : this.position + 1;
    $('html, body').animate({ scrollTop: (this.position * $(window).height()) });
  }

  handleBack() {
    this.position = this.position - 1 < 0 ? this.position : this.position - 1;
    $('html, body').animate({ scrollTop: (this.position * $(window).height()) });
  }

  render() {
    this.jsx = [];
    this.index = 0;
    document.title = this.props.app.name;
    for (let section in this.props.app.app) {
      if (this.props.app.app.hasOwnProperty(section)) {
        this.name = Object.keys(this.props.app.app)[this.index];
        this.jsx.push(<Section key={this.name} name={this.name} app={this.props.app.app[section]} onBack={this.handleBack} onNext={this.handleNext} scoreBar={this.props.app.scoreBar} />);
        this.index++;
      }
    }
    return this.jsx;
  }
};
