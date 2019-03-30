const fileSystem = require('fs')

class FileManager {

  constructor() {
    let name = "FileManager"
    let cursor
    let writeStream = fileSystem.createWriteStream('secret.txt');
  }

  ReadFilePromise(path, encoding) {
    return new Promise((resolve, reject) => {
      return fileSystem.readFile(path, encoding, (err, data) => {
        if(err) reject(err)
        resolve(data)
      })
    })
  }

  CreateCursor(path) {
    this.cursor = fileSystem.createWriteStream(path);
  }

  WriteFile(path, data) {
    if(this.cursor == null) this.CreateCursor(path)
    this.cursor.write(data)
    this.cursor.on('finish', () => {
      console.log('wrote all data to file');
    });
  }

  CleanFile(path) {
    fileSystem.writeFile(path, '', (err) => {
      if(err) throw err
    })
  }

  WatchFileDataChange(path, callback) {
    fileSystem.watch(path, { encoding: 'utf-8' }, callback)
  }

  getName() {
    return this.name
  }
}


module.exports = FileManager;
return module.exports
