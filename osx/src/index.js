import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './classes/App';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');

function file() {
  console.log($('.file-path').val());
}

if (!fs.existsSync('./src/app.json', 'utf-8')) {
  let load = (
    <div className="container">
      <br />
      <div className="input-field">
        <label htmlFor="upload">Paste JSON Here</label>
        <textarea className="materialize-textarea" id="upload" type="text"></textarea>
      </div>
      <button className="btn waves-effect waves-light" type="button" onClick={file}>Submit</button>
    </div>
  );
  ReactDOM.render(load, document.getElementById('root'));
} else {
  let app = JSON.parse(fs.readFileSync('./src/app.json', 'utf8'));

  if (!fs.existsSync('./data/')) {
    fs.mkdirSync('./data/');
  }
  if (!fs.existsSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/`)) {
    fs.mkdirSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/`);
  }

  ReactDOM.render(<App app={app} />, document.getElementById('root'));
}
