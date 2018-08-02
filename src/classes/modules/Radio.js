import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(name) {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    json[this.props.jsonKey][this.props.name] = name.name;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  render() {
    let jsx = [];
    let index = 0;
    for (let question in this.props.option) {
      if (this.props.option.hasOwnProperty(question)) {
        let name = Object.keys(this.props.option)[index];
        jsx.push(
          <p key={ name.toLowerCase().replace(/[^\w\d]/g, '-') }>
            <label>
              <input className="with-gap" type="radio" name={ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') } onClick={( ) => this.handleClick({ name }) } />
              <span>{ name }</span>
            </label>
          </p>
        );
        index++;
      }
    }
    return jsx;
  }
};
