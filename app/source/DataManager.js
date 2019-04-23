class DataManager {

  constructor(configManager) {
    this.apiConfig = configManager.getApiConfig()
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

  RemoveDouble() {
    var list = []
    var indexList = []
    for(var it of this.api_data) {
      if(!it.API_static_MainTitle in list) {
        list.push(it.API_static_MainTitle)
        indexList.push[this.api_data.indexOf(it)]
        it.API_static_Showtime = [it.API_static_Showtime]
      } else {
        push(it.API_static_Showtime)
         this.api_data.splice(this.api_data.indexOf(it), 1)
      }
    }
  }

  WriteFileByTime(data) {
    return new Promise((resolve, reject) => {

      if(this.api_data.length == 0) {
        this.api_data.push(data)
        resolve(this.api_data)
      }

      var lastIndex = this.api_data.length - 1

      if(this.TimeToInt(data.API_static_Showtime) < this.TimeToInt(this.api_data[lastIndex].API_static_Showtime)) {
        this.Sort(this.TimeToInt(data.API_static_Showtime), data)
        resolve(this.api_data)
      } else {
        this.api_data.push(data)
        resolve(this.api_data)
      }
    })
  }

  PrintTimeStamps() {
    process.stdout.write('[')
    for(var i = 0; i < this.api_data.length; i++) {
      process.stdout.write(this.api_data[i].API_static_Showtime+', ')
    }
    process.stdout.write(']\n')
  }

  Sort(timeStamp, data) {

    console.log(data.API_static_Showtime)
    this.PrintTimeStamps()
    var lastIndex = this.api_data.length - 1
    var index = 0

    while(index < lastIndex && timeStamp > this.TimeToInt(this.api_data[index].API_static_Showtime)) {
      index++;
    }

    this.InserAt(this.api_data, data, index)
  }

  InserAt(collection, data, index) {
    console.log("Insert: " + data.API_static_Showtime +" at " + index)
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
