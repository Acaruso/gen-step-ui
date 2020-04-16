const { app, BrowserWindow, dialog, ipcMain } = require('electron');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(__dirname + '/../app/index.html');

  win.webContents.openDevTools()

  ipcMain.on('open-file-dialog', (event, args) => {
    getFile(args);
  })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

function getFile(arg) {
  const { trackId } = arg;
  dialog.showOpenDialog(win, { properties: ['openFile'] })
  .then((res) => {
    const filePath = res.filePaths[0];
    win.webContents.send('file-path-loaded', {filePath: filePath, trackId: trackId})
  });
};
