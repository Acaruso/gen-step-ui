const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let win = null;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(__dirname + '/../app/index.html');
  // win.loadFile('Users/ajc/development/java/gen-step-ui/app/index.html');

  // Open the DevTools.
  win.webContents.openDevTools()

  // getFile();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

const getFile = exports.getFile = () => {
  dialog.showOpenDialog(win, {
    properties: ['openFile']
  })
  .then((res) => {
    const file = res.filePaths[0];
    const content = fs.readFileSync(file).toString();
    console.log(content);
    win.webContents.send('file-opened', file, content);
  });
};
