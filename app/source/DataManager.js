class DataManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
    this.api_data = []
    this.indexObj = {
      index: 0,
      titleList: []
    }
  }

  JsonCleaning(name, data) {
    return this.apiConfig
    .then(api => {
      var res = []
      for(var i = 0; i < api.api_list.length; i++) {
        if(api.api_list[i].api_name == name){
          if (api.api_list[i].data.fields.length == 0) return Promise.reject(new Error("There is no data to trim on"))
          for (var field of api.api_list[i].data.fields) {
            for(var j = 0; j < data.length; j++) {
              if(res[j] == null) res[j] = {}
              if(data[j][field] != null) res[j][field] = data[j][field]
            }
          }
          return res
        }
      }
      return Promise.reject(new Error("There is no api called \"" + name + "\""))
    })
    .catch(err => { throw err })
  }

  //Check if the movie already is in api_data and if yes add is Showtime to this already existing entry and sort it
  CheckForDouble(data) {
    if(this.indexObj.titleList.indexOf(data.API_static_MainTitle) == -1) {
      this.indexObj.titleList.push(data.API_static_MainTitle)
      this.indexObj[data.API_static_MainTitle] = this.indexObj.index
      data.API_static_Showtime = [data.API_static_Showtime]
      this.indexObj.index += 1
      return data
    } else {
      this.api_data[this.indexObj[data.API_static_MainTitle]].API_static_Showtime.push(data.API_static_Showtime)
      this.api_data[this.indexObj[data.API_static_MainTitle]].API_static_Showtime.sort((a, b) => {
        return(this.TimeToInt(a) - this.TimeToInt(b))
      })
      return false
    }
  }

  WriteFileByTime(data) {
    return new Promise((resolve, reject) => {
      this.api_data.push(data)
      this.api_data.sort((obj1, obj2) => {
        return(this.TimeToInt(obj1.API_static_Showtime) - this.TimeToInt(obj2.API_static_Showtime))
      })
      resolve(this.api_data)
    })
  }

  TimeToInt(time) {
    var timeStamp = 0
    var split = time.split(':').reverse()
    var curr = Math.pow(60, split.length)

    while(split.length > 0) {
      timeStamp += curr * parseInt(split.pop(), 10)
      curr /= 60
    }
    return timeStamp
  }

  ClearData() {
    this.api_data = []
    this.indexObj = {
      index: 0,
      titleList: []
    }
  }

  getApiData() {
    return this.api_data
  }
}

module.exports = DataManager
return module.exports
