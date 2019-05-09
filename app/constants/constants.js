import { remote } from 'electron';
import fs from 'fs';

const { app } = remote;

/**
 * Path to where the data is stored
 * Uses the /Application Support/ folder
 */
export const dataPath = `${app.getPath('appData')}/ScoutKit/data`;

/**
 * Lists all saved apps
 * Returns an object with two properties
 * - Array of app paths
 * - Array for app names
 */
export function listApps() {
  const apps = fs.readdirSync(dataPath).filter(e => e.includes('app-'));
  const names = [];
  if (apps.length !== 0) {
    apps.forEach(e =>
      names.push(fs.readFileSync(`${dataPath}/${e}/name.txt`, 'utf8'))
    );
  }
  return { dir: apps, names };
}

/**
 * Formats a directory name from human-readable to computer-readable
 * Replaces human-readable name with the following rules:
 * - Lowercase
 * - Spaces and non-alphanumeric symbols map to '-'
 */
export function formatDir(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^A-Za-z1-9]+/g, '-');
}
