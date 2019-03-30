const {app, BrowserWindow} = require('electron')
const FileManager = require('./FileManager');
const ApiManager = require('./ApiManager');
const DataManager = require('./DataManager');
const ConfigManager = require('./ConfigManager');

class Controler {

  constructor() {
    console.log('Controler created')
    this.api_data = []
    this.views = {}

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
    this.views[name] = obj
    obj.once('ready-to-show', () => {
      obj.show()
    })
    return obj
  }

  StoreData(data) {
    console.log(this)
    if (data != null) {
      console.log(this.fileManager.getName())
      this.fileManager.WriteFile(__dirbase + '/config/result.json', JSON.stringify(data, null, 4))
    }
  }

  ClearData() {
    this.fileManager.CleanFile(__dirbase + '/config/result.json')
  }

  SendDataToView(view) {
    this.fileManager.WatchFileDataChange(__dirbase +'/config/result.json', (event, filename) => {
      if(event === 'change') {
        // this.getStoredData()
      }
    })
  }

  getStoredData() {
    this.fileManager.ReadFilePromise('/config/result.json', 'utf-8')
    .then(JSON.parse)
    .then(data)
  }

  HandleError(err) {
    throw err
  }

  getApiData() {
    this.apiManager.RequestApi("slots")
    .then(JSON.parse)
    .then(data => this.dataManager.JsonCleaning("slots", data.data))
    .then(data => {
      return Promise.all(data.map(e => {
        this.apiManager.RequestApiById("booking", e.API_static_ParentBookingID)
        .then(JSON.parse)
        .then(json => this.dataManager.JsonCleaning("booking", json.data))
        .then(info => info[0])
        .then(info => ({data: e, info}))
        .then(this.StoreData.bind(this))
        .catch(this.HandleError)
      }))
    .catch(this.HandleError)
    })
  }
}

module.exports = Controler
return module.exports
