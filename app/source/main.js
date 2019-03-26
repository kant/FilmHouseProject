//STATIC VARIABLES AND MODULES
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
const path = require('path')

const ApiManager = require('./ApiManager');
const fileManager = require('./FileManager');
const DataManager = require('./DataManager');
const ConfigManager = require('./ConfigManager');

global.__dirbase = path.resolve(__dirname + '/..');
global.viewsDir = path.resolve(__dirbase + '/public/views')

//DINAMIC VARIABLES
const configManager = new ConfigManager(__dirbase + '/config/api.json','utf-8')
const apiManager = new ApiManager(configManager)
const dataManager = new DataManager(configManager)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null
let secondWindow = null
let firstWindow = null

app.on('ready', () => {
  mainWindow = CreateWindow('Main window', viewsDir+ '/home.html')
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
  mainWindow.show()
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
    createWindow()
  }
})

function CreateWindow(name, html_path) {
  obj = new BrowserWindow({
    width: 900,
    height: 700,
    title: name,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  obj.loadFile(html_path)
  return obj
}

//MAIN
var api_data = []
apiManager.RequestApi("slots")
.then(data => {
  data = JSON.parse(data)
  data = dataManager.JsonCleaning("slots", data.data)
  return data
})
.then(data => {
  return Promise.all(data.map(e => {
    apiManager.RequestApiById("booking", e.API_static_ParentBookingID)
    .then(JSON.parse)
    .then(json => dataManager.JsonCleaning("booking", json.data))
    .then(info => info[0])
    .then(info => ({data: e, info}))
    .then(data => sendDataToview(data, secondWindow))
  }))
.catch(err => { throw err })
})

ipcMain.on('UpdateScreen2', (event, data) => {
  if(secondWindow == null) {
    secondWindow = CreateWindow("Second Window", viewsDir + '/slideShow.html')

    secondWindow.on('close', () => {
      secondWindow = null
    })
    secondWindow.once('ready-to-show', () => {
      secondWindow.show()
      sendDataToview(null, secondWindow)
    })
  }
  sendDataToview(null, secondWindow)
})

function sendDataToview(data, view) {
  console.log(data)
  if (data != null) api_data.push(data)
  if (view != null) view.webContents.send('update-from-mainWindow', api_data)
  // if (secondWindow != null) secondWindow.webContents.send('update-from-mainWindow', api_data)
}
