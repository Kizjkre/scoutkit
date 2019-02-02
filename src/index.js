import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import M from '../node_modules/materialize-css/dist/js/materialize.min';
import './index.css';
import App from './classes/App';
import Modal from './classes/Modal';
import $ from 'jquery';
window.$ = $;
const fs = window.require('fs-extra');
const { remote }  =  window.require('electron');
const { app } = remote;
const home = app.getPath('home');
const path = app.getPath('appData');

function validateJSON(path) {
  try {
      let json = fs.readFileSync(path);
      JSON.parse(json);
  } catch (e) {
      alert("Invalid JSON file loaded. Please load a new file.", function() {
        return false;
      });
  }
  return true;
}

function handleFiles(type) {
  switch (type) {
    case 'app':
      let app_path = $('.fileload')[0].files[0].path;
      if (!validateJSON(app_path)) { break; };
      fs.copySync(app_path, `${ path }/ScoutKit/data/resources/app.json`);
      break;
    case 'schedule':
      let schedule_path = $('.fileload')[1].files[0].path;
      if (!validateJSON(schedule_path)) { break; };
      fs.copySync(schedule_path, `${ path }/ScoutKit/data/resources/schedule.json`);
      break;
    case 'scouts':
      let scouts_path = $('.fileload')[2].files[0].path;
      if (!validateJSON(scouts_path)) { break; };
      fs.copySync(scouts_path, `${ path }/ScoutKit/data/resources/scouts.json`);
      break;
    case 'prevapp':
      let filepath = $(".fileload")[3].files[0].path;
      // the following removes the "/app.json from file"
      let dirpath = filepath.split("/");
      // removes last element
      dirpath.splice(-1, 1);
      // rejoins array
      dirpath = dirpath.join('/');
      // validates each file
      if (!validateJSON(dirpath + "/app.json") || !validateJSON(dirpath + "/schedule.json") || !validateJSON(dirpath + "/scouts.json")) { break; };
      fs.copySync(dirpath, `${ path }/ScoutKit/data/resources/`);
      window.location.reload();
      break;
  }
}

if (!fs.existsSync(`${ path }/ScoutKit/`)) {
  fs.mkdirSync(`${ path }/ScoutKit/`);
}

if (!fs.existsSync(`${ path }/ScoutKit/data/`)) {
  fs.mkdirSync(`${ path }/ScoutKit/data/`);
  fs.mkdirSync(`${ path }/ScoutKit/data/resources/`);
}

if (!fs.existsSync(`${ path }/ScoutKit/data/resources/app.json`)) {
  let checkbox = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "checkbox"</code></span></div>
      </li>
      <li>
        <div className="collapsible-header">Options</div>
        <div className="collapsible-body">
          <span>
            <code>"options"</code> is an object containing all of the options for the checkbox. Inside options are objects representing options for the user.
            <br />
            Example:<br /><code>"options": { '{ "Choice 1": { "value": true }, "Choice 2": { "value": false } }' }</code>
          </span>
        </div>
      </li>
    </ul>
  );
  let counter = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "counter"</code></span></div>
      </li>
      <li>
        <div className="collapsible-header">Options</div>
        <div className="collapsible-body">
          <span>
            <code>"options"</code> is an object containing the value to increment/decrement.
            <br />
            Example:<br /><code>"options": { '{ "increment": 1 }' }</code>
          </span>
        </div>
      </li>
    </ul>
  );
  let input = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "input"</code></span></div>
      </li>
      <li>
        <div className="collapsible-header">Options</div>
        <div className="collapsible-body">
          <span>
            <code>"options"</code> is an object containing the text of the placeholder
            <br />
            Example:<br /><code>"options": { '{ "placeholder": "Hello World!" }' }</code>
          </span>
        </div>
      </li>
    </ul>
  );
  let radio = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "radio"</code></span></div>
      </li>
      <li>
        <div className="collapsible-header">Options</div>
        <div className="collapsible-body">
          <span>
            <code>"options"</code> is an object containing all of the options for the radio. Inside options are objects representing options for the user.
            <br />
            Example:<br /><code>"options": { '{ "Choice 1": { "value": true }, "Choice 2": { "value": false } }' }</code>
          </span>
        </div>
      </li>
    </ul>
  );
  let stopwatch = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "stopwatch"</code></span></div>
      </li>
    </ul>
  );
  let textarea = (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header">Type</div>
        <div className="collapsible-body"><span><code>"type": "textarea"</code></span></div>
      </li>
      <li>
        <div className="collapsible-header">Options</div>
        <div className="collapsible-body">
          <span>
            <code>"options"</code> is an object containing the text of the placeholder
            <br />
            Example:<br /><code>"options": { '{ "placeholder": "Hello World!" }' }</code>
          </span>
        </div>
      </li>
    </ul>
  );
  let load = (
    <div className="container">
      <h1>ScoutKit</h1>
      <br />
      <div className="row">
        <div className="col s6 right-align">
          <a className="btn-floating btn-large waves-effect waves-light red tooltipped modal-trigger" href="#use" data-tooltip="How to use ScoutKit" data-position="left">?</a>
        </div>
      </div>
      <br />
      <br />
      <form>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input className="fileload" type="file" onChange={ () => handleFiles('app') } />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="App Upload"  />
          </div>
        </div>
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input className="fileload" type="file" onChange={ () => handleFiles('schedule') } />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Schedule Upload"  />
          </div>
        </div>
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input className="fileload" type="file" onChange={ () => handleFiles('scouts') } />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Scouts Upload"  />
          </div>
        </div>
        <br />
        <div className="load-prev-app file-field input-field">
          <div className="btn">
            <span>File</span>
            <input className="fileload" type="file" onChange={ () => handleFiles('prevapp') } />
          </div>
        </div>
      </form>
      <br/>
      <a className="waves-effect waves-light btn" onClick={ () => window.location.reload() }>Reload</a>
      <div id="use" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4 className="modal-header">How to use ScoutKit</h4>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">1. Make the app</div>
              <div className="collapsible-body">
                <span>
                  To make the app, first you need an <code>app.json</code> file with the app. There are many different options you can have in the <code>app.json</code> file.
                  <br />
                  <br />
                  <ol className="browser-default">
                    <li>The first key-value pair you need is the name of the app, like so:<br /><code>"name": "My Scouting App"</code>.</li>
                    <li>You also need to decide whether or not you want the 'console' on the bottom. The console shows the match number, the alliance, and team that you are scouting. to enable it, have this field:<br /><code>"console": true</code></li>
                    <li>You then need to identify the export location. Do this:<br /><code>"export": "/folder/somewhere/"</code></li>
                    <li>Now, for the actual app part, you need an object with a key called <code>app</code>, like so:<br /><code>"app": { '{}' }</code></li>
                    <li>
                      Here is the basic app layout:<br />
                      <code>
                        App<br />
                        |-- Section 1<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 1<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 2<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 3<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                        |-- Section 2<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 1<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 2<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module 3<br />
                        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- Module name/info<br />
                      </code>
                    </li>
                    <li>Each section is its own JSON object, with the displayed name as the key and modules inside the object.</li>
                    <li>Each module is its own JSON object, with the displayed name as the key and other relevant information inside the object.</li>
                    <li>
                      Every module has its own set of required fields. Here is a list of all of the modules:
                      <ol className="browser-default">
                        <li><a className="modal-trigger" href="#checkbox">Checkbox</a></li>
                        <li><a className="modal-trigger" href="#counter">Counter</a></li>
                        <li><a className="modal-trigger" href="#input">Input</a></li>
                        <li><a className="modal-trigger" href="#radio">Radio</a></li>
                        <li><a className="modal-trigger" href="#stopwatch">Stopwatch</a></li>
                        <li><a className="modal-trigger" href="#textarea">Textarea</a></li>
                      </ol>
                    </li>
                  </ol>
                </span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">2. Upload the app</div>
              <div className="collapsible-body">
                <span>To upload the app, close this modal and upload the app.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">3. Upload the match schedule</div>
              <div className="collapsible-body">
                <span>
                  To upload the schedule, close this modal and upload the schedule. the schedule can be found on The Blue Alliance's website. To make a schedule:
                  <ol className="browser-default">
                    <li>Copy and paste the table into regexr.com, then apply this RegEx to the copied text:<br /><code>/Quals\s(\d+)\n(\d+)[^.](\d+)[^.](\d+)[^.](\d+)[^.](\d+)[^.](\d+)/g</code></li>
                    <li>Now replace with: <br /><code>"$1": ["$2", "$3", "$4", "$5", "$6", "$7"],</code></li>
                    <li>Copy the result into a text editor, add a <code>{ '{' }</code> at the beginning and a <code>{ '}' }</code> at the end and delete the last comma.</li>
                    <li>Save the <code>.json</code> file and upload.</li>
                  </ol>
                </span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">4. Reload</div>
              <div className="collapsible-body">
                <span>Once you upload all the necessary files, click the reload button.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <a href="javascript:void(0);" className="modal-close waves-effect waves-green btn-flat">×</a>
        </div>
      </div>
      <Modal anchor="checkbox" name="Checkbox" content={ checkbox } />
      <Modal anchor="counter" name="Counter" content={ counter } />
      <Modal anchor="input" name="Input" content={ input } />
      <Modal anchor="radio" name="Radio" content={ radio } />
      <Modal anchor="stopwatch" name="Stopwatch" content={ stopwatch } />
      <Modal anchor="textarea" name="Textarea" content={ textarea } />
    </div>
  );
  document.title = 'ScoutKit';
  ReactDOM.render(load, document.getElementById('root'));
  M.AutoInit();
} else {
  let app = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/app.json`, 'utf8'));
  let schedule = JSON.parse(fs.readFileSync(`${ path }/ScoutKit/data/resources/schedule.json`, 'utf8'));

  if (!fs.existsSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/`)) {
    fs.mkdirSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/`);
    fs.mkdirSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/data/`);
    fs.mkdirSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/`);
  }
  if (app.console && !fs.existsSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`)) {
    fs.writeFileSync(`${ path }/ScoutKit/data/${ app.name.toLowerCase().replace(/[^\w\d]/g, '-') }/resources/info.json`, `{ "match": 1, "role": "r1", "team": ${ schedule['1'][0] } }`);
  }
  if (!app.console) {
    let ask = (
      <div id="file" className="modal">
        <div className="modal-content">
          <h4>Team Number</h4>
          <div className="input-field">
            <input id="file-input" type="text" className="validate" />
            <label htmlFor="file-input">Team</label>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className="modal-close waves-effect waves-red btn-flat">×</a>
        </div>
      </div>
    );
    ReactDOM.render(ask, document.getElementById('root'));
    let modal = $('#file');
    M.Modal.init(modal);
    let instance = M.Modal.getInstance(modal);
    instance.open();
    $('#file-input').keyup(function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        app.team = $(this).val();
        $(this).val($(this).val() + '.json');
        instance.close();
        app.filename = $(this).val();
        ReactDOM.render(<App app={app} />, document.getElementById('root'));
      }
    });
  } else {
    ReactDOM.render(<App app={app} />, document.getElementById('root'));
  }
}
