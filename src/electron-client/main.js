const electron = require('electron');
const { app, Menu, BrowserWindow, webFrame, ipcMain } = electron;
const path = require('path');

let mainWindow = null;
let secWindow = null;

app.on('ready', function () {

    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    //Chargement de l'HTML dans la page
    const template = [
        {
            label: 'View',
            submenu: [
                {
                    label: 'DevTools',
                    role: 'toggledevtools'
                },
                {
                    label: 'Reload',
                    role: 'reload'
                },
                {
                    label: 'Force Reload',
                    role: 'forcereload'
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
    mainWindow.loadFile(path.join(__dirname, "index.html"));


    ipcMain.on('show-new-message-window', function () {
        console.log("NEW WINDOW");
        if (secWindow === null) {
            secWindow = new BrowserWindow({ width: 500, height: 300 });
            secWindow.loadFile(path.join(__dirname, "newMessage.html"));
        }
        secWindow.show();
        secWindow.on('close', function () { secWindow = null })
    });

    ipcMain.on('new_message_from_window', (event, message) => {
        console.log("ipc main got message for BrowserWindow")
        mainWindow.webContents.send('new_message_from_ipc_main', message);
        console.log("CLOSE NEW WINDOW");
        secWindow.close();
        secWindow = null;
    });

});


