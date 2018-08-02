import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={ this.props.anchor } className="modal">
        <div className="modal-content">
          <h4>{ this.props.name }</h4>
          { this.props.content }
        </div>
        <div className="modal-footer">
          <a href="javascript:void(0)" className="modal-close waves-effect waves-red btn-flat">×</a>
        </div>
      </div>
    );
  }
}