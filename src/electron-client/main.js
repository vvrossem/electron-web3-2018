const electron = require('electron');
const { app, Menu, BrowserWindow, globalShortcut } = electron;
const path = require('path');

app.on('ready', function () {
    let mainWindow;
    mainWindow = new BrowserWindow({ width: 800, frame: false, height: 600 });

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
    //Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.join(__dirname, "index.html"));

});
