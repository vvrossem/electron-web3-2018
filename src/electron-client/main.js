const electron = require('electron');
const { app, Menu, BrowserWindow, webFrame } = electron;
const path = require('path');

app.on('ready', function () {
    let mainWindow;
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
});