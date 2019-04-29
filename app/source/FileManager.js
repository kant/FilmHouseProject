const fileSystem = require('fs')
const chokidar = require('chokidar');
const mutexify = require('mutexify')

class FileManager {


  constructor(){
    this.lock = mutexify()
  }

  ReadFile(path, encoding) {
    return new Promise((resolve, reject) => {
      return fileSystem.readFile(path, encoding, (err, data) => {
        if(err) reject(err)
        resolve(data)
      })
    })
  }

  WriteFile(path, data) {
    this.lock(function(release) {
      console.log("Locked")
      fileSystem.writeFile(path, data, () => {
        console.log("Unlocked")
        release()        
      })
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
      persistent: true,
    });
  }
}


module.exports = FileManager;
return module.exports
