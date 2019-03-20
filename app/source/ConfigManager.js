"use strict"

const fileManager = require('./FileManager')

class ConfigManager {

  constructor(path, encoding) {
    this.api = this.LoadJsonFile(path, encoding)
  }

  LoadJsonFile(path, encoding) {
    return fileManager.ReadFilePromise(path, encoding)
    .then(result => JSON.parse(result))
    .catch(err => { throw err})
  }

  getApiConfig() {
    return this.api
  }

}


module.exports = ConfigManager;
return module.exports
