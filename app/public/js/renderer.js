// Require ipcRenderer
const { ipcRenderer } = require('electron');

const store = require('store')

let Payload = {
  'value' : 'alpha'
}

document.getElementById('CreateScreen2').addEventListener('click', () => {
  ipcRenderer.send('CreateScreen2')
})

// document.getElementById("FetchButton").addEventListener("click", () => {
//   ipcRenderer.send('update-from-mainWindow')
// })
