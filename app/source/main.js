//STATIC VARIABLES AND MODULES
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')

const ApiManager = require('./ApiManager');

global.__basedir = path.resolve(__dirname + '/..');
global.viewsDir = path.resolve(__basedir + '/public/views')
console.log(__basedir)

//DINAMIC VARIABLES
var config = {};
const apiManager = new ApiManager(__basedir + '/config/api.json')

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

//MAIN

apiManager.RequestApiByName("booking").then( _ => {
  console.log(_)
})

function CreateNewWindow(name, html_path) {
  obj = new BrowserWindow({
    width: 800,
    height: 600,
    title: name,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }

  })
  obj.loadFile(html_path)
  return obj
}


ipcMain.on('update-from-mainWindow', (event, data) => {
    if(displayWindow == null) {
      displayWindow = CreateNewWindow("Display Windows", viewsDir + '/second.html')
      displayWindow.on('close', () => {
        displayWindow = null
      })
    }
    displayWindow.once('ready-to-show', () => {
      displayWindow.show()
      displayWindow.webContents.send('update-from-mainWindow', data)
    })
    displayWindow.webContents.send('update-from-mainWindow', data)    
});
