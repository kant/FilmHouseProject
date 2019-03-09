// Require ipcRenderer
const { ipcRenderer } = require('electron');

ipcRenderer.on('update-from-mainWindow', (event, data) => {
  console.log(data.API_static_SeasonID)
  document.getElementById('DisplayData').innerHTML = data.API_static_SeasonID
})
