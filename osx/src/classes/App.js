import React from 'react';
import '../index.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../../node_modules/materialize-css/dist/js/materialize.min';
import Section from './Section';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');
const home = window.require('os').homedir();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.position = 0;
    this.info = JSON.parse(fs.readFileSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`, 'utf8'));
    this.state = {
      next: 'Next',
      value: 'next'
    };
  }

  handleClick(target) {
    switch (target) {
      case 'settings':
        let modal = $('.modal');
        M.Modal.init(modal);
        let instance = M.Modal.getInstance(modal);
        instance.open();
        break;
      case 'done':
        let schedule = JSON.parse(fs.readFileSync(`${ home }/Library/Application Support/ScoutKit/data/resources/schedule.json`, 'utf8'));
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
            `${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`,
            `{ "match": ${ this.info.match + 1 }, "role": "${ this.info.role }", "team": ${ schedule[this.info.match + 1][role[this.info.role]] } }`
          );
          window.location.reload();
        } else {
          M.toast({ html: 'Last Match!' });
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
        fs.unlinkSync(`${ home }/Library/Application Support/ScoutKit/data/resources/app.json`);
        window.location.reload();
        break;
    }
    $('html, body').animate({ scrollTop: (this.position * $(window).height()) });
  }

  render() {
    let jsx = [];
    let index = 0;
    let console = null;
    let filename = `m${ this.info.match }-${ this.info.role }-${ this.info.team }.json`;
    let manifest = [];
    let json = {};
    document.title = this.props.app.name;
    for (let section in this.props.app.app) {
      if (this.props.app.app.hasOwnProperty(section)) {
        let name = Object.keys(this.props.app.app)[index];
        jsx.push(<Section key={ name } name={ name } app={ this.props.app.app[section] } file={ `${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${filename}` } />);
        json[name] = {};
        index++;
      }
    }

    if (!fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${ filename }`)) {
      fs.writeFileSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/${ filename }`, JSON.stringify(json));
    }
    if (fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`)) {
      manifest = JSON.parse(fs.readFileSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`, 'utf8'));
    }
    if (!manifest.includes(filename)) {
      manifest.push(filename);
    }
    fs.writeFileSync(`${ home }/Library/Application Support/ScoutKit/data/${ this.props.app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/manifest.json`, JSON.stringify(manifest));

    if (this.props.app.console) {
      console = (
        <div className="row">
          <div className="col s4">
            <h5 className="console">
              { this.info.role.includes('r') ? `Red ${ this.info.role.substring(1) }` : `Blue ${ this.info.role.substring(1) }` }&nbsp;&nbsp;&nbsp;
            </h5>
          </div>
          <div className="col s4">
            <h5 className="console">
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
          <div id="settings" className="modal">
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
              <a href="#" className="modal-close waves-effect waves-red btn-flat">Close</a>
            </div>
          </div>
      </div>
    );
  }
};
