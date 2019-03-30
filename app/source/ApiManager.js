const request = require('request');

class ApiManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
    this.date = new Date().toISOString()
    this.date = this.date.substring(0,10)
    console.log(this.date)
  }

  RequestURI(uri) {
    return new Promise((resolve, reject) => {
      request(uri, (error, response, body) => {
        if(error != null)
          reject(error)
        resolve(body)
      })
    })

  }

  RequestApi(name) {
    return this.apiConfig.then(api => {
      //main loop i
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          if(api.api_list[i].date_layout != null) {
            let date = api.api_list[i].date_layout.replace('{date}', this.date)
            return this.RequestURI(api.api_uri + api.database_name + api.api_list[i].layout + date + api.api_key)
            .catch(err => { throw err })
          }
          return this.RequestURI(api.api_uri + api.database_name + api.api_list[i].layout + api.api_key)
          .catch(err => { throw err })
        }
      }
      return Promise.reject(new Error("There is no api called \"" + name + "\""))
    })
    .catch(err => { throw err })
  }

  RequestApiById(name, id) {
    // console.log('search on ' + name + ' for id:' + id)
    return this.apiConfig.then(api => {
      //main loop
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          if(api.api_list[i].id_layout != null) {
            let id_search = api.api_list[i].id_layout.replace('{id}', id)
            return this.RequestURI(api.api_uri + api.database_name + api.api_list[i].layout + id_search + api.api_key)
            .catch(err => { throw err })
          }
        }
      }
      return Promise.reject(new Error("There is no api called \"" + name + "\""))
    })
    .catch(err => { throw err })
  }

}

module.exports = ApiManager
return module.exports
