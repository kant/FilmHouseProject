const fileSystem = require('fs')
const chokidar = require('chokidar');

class FileManager {

  constructor() {
    this.api_data = []
  }

  ReadFile(path, encoding) {
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

  MonitorFile(path) {    
    return chokidar.watch(path, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
  }
}


module.exports = FileManager;
return module.exports
