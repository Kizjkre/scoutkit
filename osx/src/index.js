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

if (!fs.existsSync('./data/')) {
  fs.mkdirSync('./data/');
  fs.mkdirSync('./data/resources/');
}

if (!fs.existsSync('./data/resources/app.json')) {
  let load = (
    <div className="container">
      <br />
      <div className="input-field">
        <label htmlFor="upload">Paste JSON Here</label>
        <textarea className="materialize-textarea" id="upload"></textarea>
      </div>
      <button className="btn waves-effect waves-light" type="button" onClick={file}>Submit</button>
    </div>
  );
  ReactDOM.render(load, document.getElementById('root'));
} else {
  let app = JSON.parse(fs.readFileSync('./data/resources/app.json', 'utf8'));
  let schedule = JSON.parse(fs.readFileSync('./data/resources/schedule.json', 'utf8'));

  if (!fs.existsSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/`)) {
    fs.mkdirSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/`);
    fs.mkdirSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/data/`);
    fs.mkdirSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/resources/`);
  }
  if (app.console && !fs.existsSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/resources/info.json`)) {
    fs.writeFileSync(`./data/${app.name.toLowerCase().replace(/[^\w\d]/g, '-')}/resources/info.json`, `{ "match": 1, "role": "r1", "team": ${schedule["1"]} }`);
  }

  ReactDOM.render(<App app={app} />, document.getElementById('root'));
}
