let menuDisplayed = false;
let variant = "black";
const remote = require('electron').remote;
function hideMenu() {
    document.getElementById("menuView").style.display = "none"
    menuDisplayed = false;
    document.getElementById("headerRow").classList.add("draggable");
}

function init() {
    document.getElementById("min-btn").addEventListener("click", function () {
        const window = remote.getCurrentWindow();
        window.minimize();
    });
    document.addEventListener("click", function () {
        if (menuDisplayed) {
            hideMenu();
        }
    })
    document.getElementById("viewBtn").addEventListener("click", function (e) {
        if (document.getElementById("menuView").style.display == "block") {
            hideMenu();
        } else {
            document.getElementById("menuView").style.display = "block"
            menuDisplayed = true;
            document.getElementById("headerRow").classList.remove("draggable");
            e.stopPropagation();
        }
    });
    document.getElementById("devTools").addEventListener("click", function () {
        remote.getCurrentWindow().webContents.toggleDevTools();
    });
    document.getElementById("reload").addEventListener("click", function () {
        remote.getCurrentWindow().webContents.reload();
    });
    document.getElementById("forceReload").addEventListener("click", function () {
        remote.getCurrentWindow().webContents.reloadIgnoringCache();
    });
    document.getElementById("max-btn").addEventListener("click", function () {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });
    document.getElementById("close-btn").addEventListener("click", function () {
        const window = remote.getCurrentWindow();
        window.close();
    });


    document.getElementById("headerRow").style.opacity = 1;
    remote.globalShortcut.unregisterAll();
    remote.globalShortcut.register("CommandOrControl+Shift+I", remote.getCurrentWindow().webContents.toggleDevTools);
    remote.globalShortcut.register("CommandOrControl+Shift+R", remote.getCurrentWindow().webContents.reloadIgnoringCache);
    remote.globalShortcut.register("CommandOrControl+R", remote.getCurrentWindow().webContents.reload);


    document.getElementById("buttonTheme").addEventListener("click", function () {
        if (variant == "black") {
            variant = "white";
            document.getElementById("headerRow").style.background = "lightgrey";
            let elementsOption = document.getElementsByClassName("option");
            for (let i = 0; i < elementsOption.length; i++) {
                elementsOption[i].style.color = "#2f3136"
            }

        } else {
            variant = "black";
            document.getElementById("headerRow").style.background = "#2f3136";
            let elementsOption = document.getElementsByClassName("option");
            for (let i = 0; i < elementsOption.length; i++) {
                elementsOption[i].style.color = "white"
            }
        }
    })
}
(function () {

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init();
        }
    };
})();