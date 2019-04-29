const {app, BrowserWindow} = require('electron')
const FileManager = require('./FileManager');
const ApiManager = require('./ApiManager');
const DataManager = require('./DataManager');
const ConfigManager = require('./ConfigManager');

class Controler {

  constructor() {
    console.log('Controler created')
    this.encoding = 'utf-8'
    this.watcher = null

    this.fileManager = new FileManager()
    this.configManager = new ConfigManager(this.fileManager, __dirbase + '/config/api.json','utf-8')
    this.apiManager = new ApiManager(this.configManager)
    this.dataManager = new DataManager(this.configManager)
  }

  CreateWindow(name, html_path) {
    let obj = new BrowserWindow({
      width: 900,
      height: 700,
      title: name,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    obj.loadFile(html_path)
    obj.once('ready-to-show', () => {
      obj.show()
    })
    return obj
  }

  HandleError(err) {
    throw err
  }

  //Get the data movie by movie
  getApiData() {
    return this.apiManager.RequestApi("slots")
    .then(JSON.parse)
    .then(data => this.dataManager.JsonCleaning("slots", data.data))
    .then(data => {
      return Promise.all(data.map(e => {
        this.apiManager.RequestApiById("booking", e.API_static_ParentBookingID)
        .then(JSON.parse)
        .then(json => this.dataManager.JsonCleaning("booking", json.data))
        .then(info => { return Object.assign(e, info[0]) })
        .then(this.StoreData.bind(this))
        .catch(this.HandleError)
      }))
    .catch(this.HandleError)
    })
  }

  StoreData(data) {
    this.dataManager.WriteFileByTime(data)
    .then(api_data => {
      this.fileManager.WriteFile(__dirbase + '/config/result.json', JSON.stringify(api_data, null, 4), this.encoding)
    })
    .catch(this.HandleError)
  }

  MonitorDataForView(view, path) {
    if(this.watcher === null) {
      this.watcher = this.fileManager.MonitorFile(path)
    }
    this.watcher.on('change', path =>  {
      this.SendDataToView(view, path)
    })
  }

  SendDataToView(view, path, option) {
    this.getStoredData(path)
    .then(api_data => {

      if(api_data == null) api_data = []
      if(option != null) api_data = api_data = { option: option, data: api_data }

      view.webContents.once('dom-ready', () => {
        view.webContents.send('data-update', api_data)
      })
      view.webContents.send('data-update', api_data)
    })
    .catch(this.HandleError)
  }

  getStoredData(path) {
    return this.fileManager.ReadFile(path, this.encoding)
    .then(api_data => {
      return JSON.parse(api_data)
    })
    .catch(err => {

      this.fileManager.WriteFile(__dirbase + '/config/result.json', JSON.stringify(this.dataManager.api_data, null, 4), this.encoding)
      console.log("There was a problem with the JSON parsing")
    })
  }

  ClearData() {
    this.fileManager.CleanFile(__dirbase + '/config/result.json')
    this.dataManager.ClearData()
  }
}

module.exports = Controler
return module.exports
