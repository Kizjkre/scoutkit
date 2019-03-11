import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class YesNo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(name) {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    json[this.props.jsonKey][this.props.name] = name.name;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  render() {
    return (
      <div>
        <div key="br" style={{lineHeight:0.8}}><br/></div>
        <span style = {{margin:10}} key="yes">
          <label>
            <input className="with-gap" type="radio" name="yes" onClick={( ) => this.handleClick("yes") } />
           <span>yes</span>
          </label>
        </span>
        <span style = {{margin:20}} key="no">
          <label>
            <input className="with-gap" type="radio" name="no" onClick={( ) => this.handleClick("no") } />
            <span>no</span>
          </label>
        </span>
      </div>
    );
  }
};
