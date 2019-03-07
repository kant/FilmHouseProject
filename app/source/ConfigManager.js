"use strict"

const fileManager = require('./FileManager')

function LoadJsonFile(path, encoding) {
    return fileManager.ReadFilePromise(path, encoding)
    .then(result => JSON.parse(result))
    .catch(err => { throw err})
  }

module.exports.LoadJsonFile = LoadJsonFile;
return module.exports
