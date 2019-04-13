import { remote } from 'electron';
import fs from 'fs';

const { app } = remote;

export const dataPath = `${ app.getPath('appData') }/ScoutKit/data`;

export function listApps() {
  let
    apps = fs.readdirSync(dataPath).filter(e => e.includes('app-')),
    names = [];
  apps.length !== 0 && apps.forEach(e => names.push(
    fs.readFileSync(`${ dataPath }/${ e }/name.txt`, 'utf8')
  ));
  return { dir: apps, names: names };
}

export function rmrf(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      var curPath = `${ path }/${ file }`;
      if (fs.lstatSync(curPath).isDirectory()) {
        rmrf(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
