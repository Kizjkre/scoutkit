import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.selected = [];
  }

  handleClick(name) {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    if (this.selected.includes(name)) {
      let index = this.selected.indexOf(name);
      this.selected.splice(index, 1);
    } else {
      this.selected.push(name);
    }
    json[this.props.jsonKey][this.props.name] = this.selected;
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
              <input type="checkbox" id={ name.toLowerCase().replace(/[^\w\d]/g, '-') } onClick={ () => this.handleClick(name) } />
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
