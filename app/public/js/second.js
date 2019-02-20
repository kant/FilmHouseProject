// Require ipcRenderer
const { ipcRenderer } = require('electron');

ipcRenderer.on('update-from-mainWindow', (event, data) => {
  console.log(data.value)
  document.getElementById('DisplayData').innerHTML = data.value
})
