import React from 'react';
import '../index.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min';
import Question from './Question';

export default class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let jsx = [];
    let index = 0;
    let rendered = [];
    let temp = [];
    for (let question in this.props.app) {
      if (this.props.app.hasOwnProperty(question)) {
        let name = Object.keys(this.props.app)[index];
        index++;
        jsx.push((
          <div key={ name } className='col s4'>
            <Question key={ name } name={ name } question={ this.props.app[question] } file={ this.props.file } jsonKey={ this.props.name } />
          </div>
        ));
      }
    }
    for (let i = 0; i < jsx.length; i += 3) {
      temp.push([jsx.slice(i, i + 3)]);
    }
    for (let i = 0; i < temp.length; i++) {
      rendered.push((
        <div key={ `${ i }-div` } className="row">{ temp[i] }</div>
      ));
    }
    return (
      <div className={ `section section-${ this.props.name.toLowerCase().replace(/[^\w\d]/g, '-') }` }>
        <h1 className="section-title">{ this.props.name }</h1>
        <div className="divider">-</div>
        <div>
          <br />
          { rendered }
        </div>
      </div>
    );
  }
}
