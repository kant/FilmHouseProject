const fileSystem = require('fs')
const events = require('events');

class FileManager {

  constructor() {
    this.api_data = []
  }

  ReadFilePromise(path, encoding) {
    return new Promise((resolve, reject) => {
      return fileSystem.readFile(path, encoding, (err, data) => {
        if(err) reject(err)
        resolve(data)
      })
    })
  }

  WriteFile(path, data, encoding) {
    fileSystem.writeFile(path, data, encoding, (err) => {
      if(err) throw err
    })
  }

  CleanFile(path) {
    fileSystem.writeFile(path, '', (err) => {
      if(err) throw err
    })
  }

  MonitorFile(path, callback) {
    fileSystem.watch(path, { encoding: 'utf-8' }, callback)
  }
}


module.exports = FileManager;
return module.exports
