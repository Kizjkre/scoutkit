import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

const { remote }  =  window.require('electron');
const { app } = remote;
const path = app.getPath('appData');
let scouts = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/scouts.json`, 'utf8'));

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
    console.log(json);
    json[this.props.jsonKey][this.props.name] = this.state.value;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    }, () => this.save());
  }

  handleClick() {
    let scout_id = document.getElementsByClassName('scout-input')[0].value;
    if (Object.keys(scouts).indexOf(scout_id) >= 0) {
      document.getElementsByClassName('scout-name')[0].innerText = 'Welcome, ' +  scouts[scout_id] + ".";
    } else {
      console.log(scout_id);
    }
  }

  render() {
    return (
      <div className="input-field">
        <input className="scout-input" id={ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') } type="text" onChange={ this.handleChange } />
        <label htmlFor={ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') }>{ this.props.option.placeholder }</label>
        <button className="btn waves-effect waves-light green" onClick={ () => this.handleClick() }>Submit</button>
        <h3 className="scout-name"></h3>
      </div>
    );
  }
};
