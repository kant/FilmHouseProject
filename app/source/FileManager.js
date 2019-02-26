const fs = require('fs')

function ReadFilePromise(path, encoding) {
  return new Promise((resolve, reject) => {
    return fs.readFile(path, encoding, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })
}

function WriteFile(path, data) {
  fs.appendFile(path, data, (err) => {
    if(err) throw err
  })
}

module.exports.ReadFilePromise = ReadFilePromise;
module.exports.WriteFile = WriteFile;
return module.exports
