//STATIC VARIABLES AND MODULES
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')

global.__dirbase = path.resolve(__dirname + '/..');
global.viewsDir = path.resolve(__dirbase + '/public/views')

//DINAMIC VARIABLES
const Controler = require('./Controler');
const controler = new Controler()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let secondWindow = null
let firstWindow = null

app.on('ready', () => {
  mainWindow = controler.CreateWindow('Main window', viewsDir+ '/home.html')
  .on('closed', () => {
    mainWindow = null
    app.quit()
  })
  controler.ClearData()
})

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
    controler.CreateWindow('Main window', viewsDir+ '/home.html')
  }
})

//MAIN

ipcMain.on('UpdateScreen1', (event, data) => {
  if(firstWindow == null) {
    firstWindow = controler.CreateWindow("First Window", viewsDir + '/movieDisplay.html')
    .on('close', () => {
      firstWindow = null
    })    
  }
  controler.SendDataToView(firstWindow, __dirbase + '/config/result.json')
})

ipcMain.on('UpdateScreen2', (event, data) => {
  if(secondWindow == null) {
    secondWindow = controler.CreateWindow("Second Window", viewsDir + '/slideShow.html')
    .on('close', () => {
      secondWindow = null
    })
  }
  controler.SendDataToView(secondWindow, __dirbase + '/config/result.json')
})

ipcMain.on('FetchData', (evet, data) => {
  controler.ClearData()
  controler.getApiData()
})
