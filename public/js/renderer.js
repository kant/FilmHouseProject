// Require ipcRenderer
const { ipcRenderer } = require('electron');

const store = require('store')

let Payload = {
  'value' : 'alpha'
}

document.getElementById('DataInput').addEventListener('change', () => {
  Payload.value = document.getElementById('DataInput').value  
})

document.getElementById("FetchButton").addEventListener("click", () => {
  ipcRenderer.send('update-from-mainWindow', Payload)
})
