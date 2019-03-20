const ConfigManager = require('./ConfigManager');

class DataManager {

  constructor(configManager) {    
    this.apiConfig = configManager.getApiConfig()
  }

  JsonCleaning(name, data) {
    return this.apiConfig.then(api => {
      var res = {}
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          console.log(api.api_list[i].api_name)
          if (api.api_list[i].data.fields.length == 0) return Promise.reject(new Error("There is no data to trim on"))
          for (var field of api.api_list[i].data.fields) {
            console.log(field)
            if (data[field] != null) res[field] = data[field]
          }
          return res
        }
      }
      return Promise.reject(new Error("There is no api called \"" + name + "\""))
    })
    .catch(err => { throw err })
  }
}

module.exports = DataManager
return module.exports
