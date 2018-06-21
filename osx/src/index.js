import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './classes/App';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');
const home = window.require('os').homedir();

function handleFiles() {
  fs.copySync($('.fileload')[0].files[0].path, `${ home }/Library/Application Support/ScoutKit/data/resources/app.json`);
  window.location.reload();
}

if (!fs.existsSync(`${ home }/Library/Application Support/ScoutKit/`)) {
  fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/`);
}

if (!fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/`)) {
  fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/data/`);
  fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/data/resources/`);
}

if (!fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/resources/app.json`)) {
  let load = (
    <div className="container">
      <form>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input className="fileload" type="file" onChange={() => handleFiles()} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </form>
    </div>
  );
  document.title = 'ScoutKit';
  ReactDOM.render(load, document.getElementById('root'));
} else {
  let app = JSON.parse(fs.readFileSync(`${ home }/Library/Application Support/ScoutKit/data/resources/app.json`, 'utf8'));
  let schedule = JSON.parse(fs.readFileSync(`${ home }/Library/Application Support/ScoutKit/data/resources/schedule.json`, 'utf8'));

  if (!fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/`)) {
    fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/`);
    fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/`);
    fs.mkdirSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/`);
  }
  if (app.console && !fs.existsSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`)) {
    fs.writeFileSync(`${ home }/Library/Application Support/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`, `{ "match": 1, "role": "r1", "team": ${ schedule['1'][0] } }`);
  }

  ReactDOM.render(<App app={app} />, document.getElementById('root'));
}
