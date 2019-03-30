class DataManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
  }

  JsonCleaning(name, data) {
    return this.apiConfig.then(api => {
      var res = []
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          if (api.api_list[i].data.fields.length == 0) return Promise.reject(new Error("There is no data to trim on"))
          for (var field of api.api_list[i].data.fields) {
            for(var j = 0; j < data.length; j++) {
              if(res[j] == null) res[j] = {}
              if (data[j][field] != null) res[j][field] = data[j][field]
            }
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
