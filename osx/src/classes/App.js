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
    this.position = 0;
    this.info = JSON.parse(fs.readFileSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/resources/info.json`, 'utf8'));
    this.state = {
      next: 'Next',
      value: true
    };
  }

  handleClick(bool) {
    if (arguments.length === 0) {
      if (fs.existsSync('/Volumes/1540/')) {
        if (!fs.existsSync('/Volumes/1540/companal/')) {
          fs.mkdirSync('/Volumes/1540/companal/');
        }
        if (!fs.existsSync(`/Volumes/1540/companal/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}`)) {
          fs.mkdirSync(`/Volumes/1540/companal/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}`);
        }
      //  Copy Files and profit
      }
    } else if (bool == null) {
      let schedule = JSON.parse(fs.readFileSync('./data/resources/schedule.json', 'utf8'));
      let role = {
        'r1': 0,
        'r2': 1,
        'r3': 2,
        'b1': 3,
        'b2': 4,
        'b3': 5
      };
      if (typeof schedule[this.info.match + 1] === 'object') {
        fs.writeFileSync(
          `./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/resources/info.json`,
          `{ "match": ${this.info.match + 1}, "role": "${this.info.role}", "team": ${schedule[this.info.match + 1][role[this.info.role]]} }`
        );
        window.location.reload();
      } else {
        // Toast this
        alert('Last match.');
      }
    } else if (bool) {
      if (this.position + 3 > Object.keys(this.props.app.app).length) {
        this.setState({
          next: 'Done!',
          value: null
        });
      }
      this.position++;
    } else {
      this.setState({
        next: 'Next',
        value: true
      });
      this.position = this.position - 1 < 0 ? this.position : this.position - 1;
    }
    $('html, body').animate({ scrollTop: (this.position * $(window).height()) });
  }

  render() {
    let jsx = [];
    let index = 0;
    let console = null;
    let filename = `m${this.info.match}-${this.info.role}-${this.info.team}.json`;
    let manifest = [];
    let json = {};
    document.title = this.props.app.name;
    for (let section in this.props.app.app) {
      if (this.props.app.app.hasOwnProperty(section)) {
        let name = Object.keys(this.props.app.app)[index];
        jsx.push(<Section key={name} name={name} app={this.props.app.app[section]} file={`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/${filename}`} />);
        json[name] = {};
        index++;
      }
    }

    if (!fs.existsSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/${filename}`)) {
      fs.writeFileSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/${filename}`, JSON.stringify(json));
    }
    if (fs.existsSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/manifest.json`)) {
      manifest = JSON.parse(fs.readFileSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/manifest.json`, 'utf8'));
    }
    if (!manifest.includes(filename)) {
      manifest.push(filename);
    }
    fs.writeFileSync(`./data/${this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/manifest.json`, JSON.stringify(manifest));

    if (this.props.app.console) {
      console = (
        <div className="row">
          <div className="col s4">
            <h5 className="console">
              {this.info.role.includes('r') ? `Red ${this.info.role.substring(1)}` : `Blue ${this.info.role.substring(1)}`}&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
          <div className="col s4">
            <h5 className="console">
             Match {this.info.match}&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
          <div className="col s4">
            <h5 className="console">
              Team {this.info.team}&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
        </div>
      );
    }

    return (
      <div>
        {jsx}
        <footer>
          <div className="divider">-</div>
          <br/>
          <div className="row">
            <div className="col s2">
              <button className="btn waves-effect waves-light" onClick={() => this.handleClick(false)}>Back</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn waves-effect waves-light" onClick={() => this.handleClick()}>Export Data</button>
            </div>
            <div className="col s8">
              {console}
            </div>
            <div className="col s2" style={{textAlign: 'right'}}>
              <button className="btn waves-effect waves-light" onClick={() => this.handleClick(this.state.value)}>{this.state.next}</button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};
