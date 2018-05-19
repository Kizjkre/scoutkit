const electron = require('electron');
const { app, BrowserWindow } = electron;

let index;
const startUrl = process.env.ELECTRON_START_URL || `file://${__dirname}/../build/index.html`;
app.on('ready', function () {
  index = new BrowserWindow({
    width: 1440,
    height: 900
  }).loadURL(startUrl);
});
