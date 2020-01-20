import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

const { remote }  =  window.require('electron');
const { app } = remote;
const path = app.getPath('appData');
let scouts;
try {
  scouts = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/scouts.json`, 'utf8'));
} catch (e) {
  scouts = {};
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  save() {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    if (json[this.props.jsonKey] === undefined) {
      json[this.props.jsonKey] = {}
    }
    json["info"]["scout"] = this.state.scout;
    json["info"]["scout_name"] = this.state.scoutName;
    json[this.props.jsonKey][this.props.name] = this.state.value;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  handleChange(e) { }

  handleClick() {
    let scout_id = document.getElementsByClassName('scout-input')[0].value;
    if (Object.keys(scouts).indexOf(scout_id) >= 0) {
      document.getElementsByClassName('scout-name')[0].innerText = 'Welcome, ' +  scouts[scout_id] + ".";
      this.setState({
        value: ""+scout_id,
        scout: scout_id,
        scoutName: scouts[scout_id]
      }, () => this.save());
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.handleClick();
  }

  render() {
    return (
      <form onSubmit = { this.onFormSubmit } className="input-field">
        <input className="scout-input" id={ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') } type="text" onChange={ this.handleChange } />
        <label htmlFor={ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') }>{ this.props.option.placeholder }</label>
        <button type='submit' className="btn waves-effect waves-light green" onClick={ () => this.handleClick() }>Submit</button>
        <h3 className="scout-name"></h3>
      </form>
    );
  }
};
