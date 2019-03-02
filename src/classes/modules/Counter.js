import React from 'react';
import '../../index.css';
import '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../../node_modules/materialize-css/dist/js/materialize.min';
const fs = window.require('fs-extra');


export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  save() {
    let json = JSON.parse(fs.readFileSync(this.props.file, 'utf8'));
    json[this.props.jsonKey][this.props.name] = this.state.value;
    fs.writeFileSync(this.props.file, JSON.stringify(json));
  }

  handleClick(bool) {
    if (bool) {
      this.setState((prevState) => {
        return { count: prevState.value += this.props.option.increment }
      }, () => this.save());
    } else {
      this.setState((prevState) => {
        return { count: prevState.value -= this.props.option.increment }
      }, () => this.save());
    }
  }


  render() {
    return (
      <div>
        <div className="special-btn-wrap">
          <button className="btn waves-effect waves-light red" onClick={ () => this.handleClick(false) }>-{ this.props.option.increment }</button>
          <span style = { {margin: 20} } className="special-input" readOnly >{ this.state.value }</span>
          <button className="btn waves-effect waves-light green" onClick={ () => this.handleClick(true) }>+{ this.props.option.increment }</button>
        </div>
      </div>
    );
  }
};
