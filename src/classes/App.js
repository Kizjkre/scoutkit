import React from 'react';
import '../index.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../../node_modules/materialize-css/dist/js/materialize.min';
import Section from './Section';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');
const { remote }  =  window.require('electron');
const { app } = remote;
const path = app.getPath('appData');
const home = app.getPath('home');
let wayToFlash = "/Volumes/1540";
if (window.navigator.platform == "Win32") { wayToFlash = "D:/"; }
const role = {
  'r1': 0,
  'r2': 1,
  'r3': 2,
  'b1': 3,
  'b2': 4,
  'b3': 5
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.position = 0;
    this.info = this.props.app.console ? JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`, 'utf8')): undefined;
    this.state = {
      next: 'Next',
      value: 'next'
    };
  }

  changeRole() {
    let schedule = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/schedule.json`, 'utf8'));
    let newRole = window.prompt('New role:', this.info.role);
    let newInfo = { role: newRole, match: this.info.match, team: schedule[this.info.match][role[this.info.role]] };
    fs.writeFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`, JSON.stringify(newInfo));
  }

  handleClick(target) {
    switch (target) {
      case 'settings':
        let modal = $('.setmodal');
        M.Modal.init(modal);
        let instance = M.Modal.getInstance(modal);
        instance.open();
        break;
      case 'matchnum':
        let match_modal = $('.matchmodal');
        M.Modal.init(match_modal);
        let match_instance = M.Modal.getInstance(match_modal);
        match_instance.open();
        break;
      case 'submitmatch':
        let new_match = parseInt(document.getElementById("newMatchInput").value);
        let submit_schedule = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/schedule.json`, 'utf8'));
        if (submit_schedule[new_match] !== undefined && !Number.isNaN(submit_schedule[new_match])) {
          fs.writeFileSync(
            `${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`,
            `{ "match": ${ new_match }, "role": "${ this.info.role }", "team": ${ submit_schedule[new_match][role[this.info.role]] } }`
          );
        }
        window.location.reload();
        break;
      case 'done':
        if (this.props.app.console) {
          let schedule = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/schedule.json`, 'utf8'));
          if (typeof schedule[this.info.match + 1] === 'object') {
            fs.writeFileSync(
              `${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`,
              `{ "match": ${ this.info.match + 1 }, "role": "${ this.info.role }", "team": ${ schedule[this.info.match + 1][role[this.info.role]] } }`
            );
            window.location.reload();
          } else {
            M.toast({ html: 'Last Match!' });
          }
        } else {
          window.location.reload();
        }
        break;
      case 'next':
        if (this.position + 3 > Object.keys(this.props.app.app).length) {
          this.setState({
            next: 'Done!',
            value: 'done'
          });
        }
        this.position++;
        break;
      case 'back':
        this.setState({
          next: 'Next',
          value: 'next'
        });
        this.position = this.position - 1 < 0 ? this.position : this.position - 1;
        break;
      case 'new':
        fs.copySync(`${ path }/ScoutKit/data/resources`, `${ home }/Desktop/Scouting/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/app`);
        fs.unlinkSync(`${ path }/ScoutKit/data/resources/app.json`);
        window.location.reload();
        break;
      case 'export':
        let manifest = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`));
        let flashManifest = JSON.parse(fs.readFileSync(`${ wayToFlash }/companal/${ this.props.app.export }/manifest.json`));
        for (let i = 0; i < manifest.length; i++) {
          fs.copySync(
            `${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${ manifest[i] }`,
            `${ wayToFlash }/companal/${ this.props.app.export }/${ manifest[i] }`
          );
        }
        manifest = manifest.concat(flashManifest);
        manifest = manifest.filter(function(item, pos) { return manifest.indexOf(item) == pos; });
        fs.copySync(
          `${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`,
          `${ wayToFlash }/companal/${ this.props.app.export }/manifest.json`
        );
        break;
    }
    $('html, body').animate({ scrollTop: (this.position * $(window).height()) });
  }

  render() {
    let jsx = [];
    let index = 0;
    let console = null;
    let filename = this.props.app.filename === undefined ? `m${ this.info.match }-${ this.info.role }-${ this.info.team }.json` : this.props.app.filename;
    let manifest = [];
    let json = {};
    if (this.props.app.console) { json = {"info": {"team":this.info.team,"role":this.info.role,"match":this.info.match}}; }
    else { json = {"info": {"team":this.props.app.team}} }
    document.title = this.props.app.name;
    for (let section in this.props.app.app) {
      if (this.props.app.app.hasOwnProperty(section)) {
        let name = Object.keys(this.props.app.app)[index];
        jsx.push(<Section key={ name } name={ name } app={ this.props.app.app[section] } file={ `${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${filename}` } />);
        json[name] = {};
        index++;
      }
    }
    window.console.log(JSON.stringify(json));
    if (!fs.existsSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${ filename }`)) {
      fs.writeFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${ filename }`, JSON.stringify(json));
    }
    if (fs.existsSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`)) {
      manifest = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`, 'utf8'));
    }
    if (!manifest.includes(filename)) {
      manifest.push(filename);
    }
    fs.writeFileSync(`${ path }/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`, JSON.stringify(manifest));

    if (this.props.app.console) {
      console = (
        <div className="row">
          <div className="col s4" onClick={ () => this.changeRole() }>
            <h5 className="console">
              { this.info.role.includes('r') ? `Red ${ this.info.role.substring(1) }` : `Blue ${ this.info.role.substring(1) }` }&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
          <div className="col s4">
            <h5 onClick = { () => this.handleClick('matchnum') } className="console">
             Match { this.info.match }&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
          <div className="col s4">
            <h5 className="console">
              Team { this.info.team }&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
        </div>
      );
    }

    return (
      <div>
        { jsx }
        <footer>
          <div className="divider">-</div>
          <br/>
          <div className="row">
            <div className="col s2">
              <button className="btn waves-effect waves-light" onClick={ () => this.handleClick('back') }>Back</button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn waves-effect waves-light" onClick={ () => this.handleClick('settings') }>Settings</button>
            </div>
            <div className="col s8">
              { console }
            </div>
            <div className="col s2" style={ { textAlign: 'right' } }>
              <button className="btn waves-effect waves-light" onClick={ () => this.handleClick(this.state.value) }>{ this.state.next }</button>
            </div>
          </div>
        </footer>
        <div id="matchmodal" className="modal matchmodal">
          <div className="modal-content">
            <h4>Edit Match Number:</h4>
            <input id="newMatchInput" type="number" />
            <button className="btn green" onClick={ () => this.handleClick('submitmatch') }>Submit</button>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-red btn-flat">×</a>
          </div>
        </div>
        <div id="settings" className="modal setmodal">
          <div className="modal-content">
            <h4>Settings</h4>
            <div className="row">
              <div className="col s6">
                <div className="card teal lighten-4">
                  <div className="card-content">
                    <h5>Export Data</h5>
                    <button className="btn waves-effect waves-light" onClick={ () => this.handleClick('export') }>Export</button>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="card teal lighten-4">
                  <div className="card-content">
                    <h5>Load New App</h5>
                    <button className="btn waves-effect waves-light" onClick={ () => this.handleClick('new') }>+ New</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-red btn-flat">×</a>
          </div>
        </div>
      </div>
    );
  }
};
