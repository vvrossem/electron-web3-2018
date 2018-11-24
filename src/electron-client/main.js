const electron = require('electron');
const { app, Menu, BrowserWindow, webFrame, ipcMain } = electron;
const path = require('path');

let mainWindow = null;
let secWindow = null;

app.on('ready', function () {

    var iconPath = path.join(__dirname, 'ico.png');
    mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false, icon: iconPath });
    //Chargement de l'HTML dans la page
    const template = [
        {
            label: 'Exemple',
            submenu: [
                {
                    role: 'undo',
                },
                {
                    role: 'undo',
                    label: 'miaou miaou'
                },
                {
                    label: 'checkbox',
                    type: 'checkbox',
                    checked: 'true',
                    click: () => { console.log('checkbox') }
                },
                {
                    label: 'radio1',
                    type: 'radio',
                    click: () => { console.log('radio1') }
                }, {
                    label: 'radio2',
                    type: 'radio',
                    click: () => { console.log('radio2') },
                    accelerator: '2'
                },

            ]
        }
    ]

    if (process.platform === 'darwin') {
        //IOS
    }
    const menu = Menu.buildFromTemplate(template)
    //Menu.setApplicationMenu(menu);


    mainWindow.loadFile(path.join(__dirname, "index.html"));


    ipcMain.on('show-new-message-window', function() {
      console.log("NEW WINDOW");
      if(secWindow===null){
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
      secWindow =null;
    });

});


