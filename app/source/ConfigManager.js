"use strict"

class ConfigManager {

  constructor(fileManager, path, encoding) {
    this.fileManager = fileManager
    this.api = this.LoadJsonFile(path, encoding)
  }

  LoadJsonFile(path, encoding) {
    return this.fileManager.ReadFilePromise(path, encoding)
    .then(JSON.parse)
    .catch(err => { throw err})
  }

  getApiConfig() {
    return this.api
  }

}


module.exports = ConfigManager;
return module.exports
