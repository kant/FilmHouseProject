//STATIC VARIABLES AND MODULES
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')

const ApiManager = require('./ApiManager');
const fileManager = require('./FileManager');
const DataManager = require('./DataManager')

global.__dirbase = path.resolve(__dirname + '/..');
global.viewsDir = path.resolve(__dirbase + '/public/views')
console.log(__dirbase)

//DINAMIC VARIABLES
const apiManager = new ApiManager(__dirbase + '/config/api.json')
const dataManager = new DataManager(__dirbase + '/config/api.json')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let displayWindow = null
let secondWindow = null

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
  mainWindow.loadFile(viewsDir+ '/home.html')
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

var api_data = apiManager.RequestApiByName("booking")
.then(res => {
  res = JSON.parse(res)
  fileManager.WriteFile(__dirbase + '/config/result.json',JSON.stringify(res.data[0]))
  return dataManager.JsonCleaning("booking", res.data[0])
})
.catch(err => { throw err })

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
      var displayWindow = CreateNewWindow("Display Windows", viewsDir + '/second.html')
      displayWindow.on('close', () => {
        displayWindow = null
      })
    }
    displayWindow.once('ready-to-show', () => {
      displayWindow.show()
      displayWindow.webContents.send('update-from-mainWindow', data)
    })
    data = api_data.then(_ => {
      console.log(_)
      displayWindow.webContents.send('update-from-mainWindow', _)
    }).catch(err => {throw err})
});

ipcMain.on('CreateScreen2', (event, data) => {
  if(secondWindow == null) {
    secondWindow = CreateNewWindow("Second Window", viewsDir + '/Slideshow.html')
    secondWindow.on('close', () => {
      secondWindow = null
    })
  }
  secondWindow.once('ready-to-show', () => {
    secondWindow.show()
    secondWindow.webContents.send('update-from-mainWindow', data)
  })
  api_data.then(_ =>  {
    console.log(_)
    secondWindow.webContents.send('update-from-mainWindow', _)
  }).catch(err => {throw err})
})
