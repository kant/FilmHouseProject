"use strict"

const request = require('request');
const configManager = require('./ConfigManager');

class ApiManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
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

  RequestApiByName(name) {
    return this.apiConfig.then(api => {
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          return this.RequestURI(api.api_list[i].uri + api.api_list[i].databse_name + api.api_list[i].layout + api.api_list[i].api_key)
          .catch(err => { throw err })
        }
      }
      return Promise.reject(new Error("There is no api called \"" + name + "\""))
    })
    .catch(err => { throw err })
  }
}

module.exports = ApiManager
return module.exports
