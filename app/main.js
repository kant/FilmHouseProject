// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')
global.appRoot = path.resolve(__dirname);
global.viewsDir = path.resolve(appRoot + '/views')
console.log(viewsDir)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let displayWindow = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Main window",
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile(viewsDir+ '/index.html')
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Attach event listener to event that requests to update something in the second window
// from the first window
ipcMain.on('update-from-mainWindow', (event, data) => {
    if(displayWindow === null) {
      displayWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Display window",
        parent : mainWindow,
        webPreferences: {
          nodeIntegration: true
        }
      })
      displayWindow.loadFile('./Views/second.html')
      displayWindow.on('close', () => {
        displayWindow = null
      })    
    }
    displayWindow.webContents.send('update-from-mainWindow', data)
});
