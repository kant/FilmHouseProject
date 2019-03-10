const configManager = require('./ConfigManager');

class DataManager {

  constructor(path) {
    this.apiConfig = configManager.LoadJsonFile(path)
  }

  JsonCleaning(name, data) {
    return this.apiConfig.then(api => {
      var res = {}
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          if (api.api_list[i].data.fields.length == 0) reject("There is no data to trim on")
          for (var field of api.api_list[i].data.fields) {
            if (data[field] != null) res[field] = data[field]
          }
          return res
        }
        reject("There is no api called " + name)
      }
    })
    .catch(err => { throw err })
  }
}

module.exports = DataManager
return module.exports
