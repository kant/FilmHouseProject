class DataManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
    this.mimic = []
    this.api_data = []
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

  WriteFileByTime(data) {
    return new Promise((resolve, reject) => {
      console.log(this.mimic)
      if(this.mimic.length == 0) {
        this.mimic.push(this.TimeToInt(data.API_static_Showtime))
        this.api_data.push(data)
        resolve(this.api_data)
      }
      var lastIndex = this.mimic.length - 1
      if(this.mimic[lastIndex] > this.TimeToInt(data.API_static_Showtime)) {
        this.Sort(data, this.TimeToInt(data.API_static_Showtime))
        resolve(this.api_data)
      } else {
        this.api_data.push(data)
        this.mimic.push(this.TimeToInt(data.API_static_Showtime))
        resolve(this.api_data)
      }
      reject(new Error("nik"));
    })
  }

  Sort(data, timeStamp) {

    var index = this.api_data.length - 1

    while(this.mimic[index] > timeStamp  && index > 0) {
      index--
    }
    if(index > 0) index++    
    this.InserAt(this.api_data, data, index)
    this.InserAt(this.mimic, timeStamp, index)
  }

  InserAt(collection, data, index) {
    collection.splice(index, 0, data)
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

  getApiData() {
    return this.api_data
  }
}

module.exports = DataManager
return module.exports
