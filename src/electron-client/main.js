const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;
app.on('ready', function () {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    //Chargement de l'HTML dans la page
    mainWindow.loadFile(path.join(__dirname, "index.html"));
});