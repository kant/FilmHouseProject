"use strict"

const request = require('request');
const fileManager = require('./fileManager')


class ApiManager {
  constructor(path) {
    this.apiConfig = this.SetApiVariables(path)
  }

  SetApiVariables(path) {
    return fileManager.ReadFilePromise(path, 'utf-8')
    .then(result => JSON.parse(result))
    .catch(err => { throw err})
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
      reject("There is no api called " + name)
    })
    .catch(err => { throw err })
  }
}

module.exports = ApiManager
return module.exports
